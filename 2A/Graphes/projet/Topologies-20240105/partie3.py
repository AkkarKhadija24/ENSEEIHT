import pandas as pd
import matplotlib.pyplot as plt
import networkx as nx
import numpy as np
import seaborn as sns

# Dans ce fichier, les premiers codes se réfèrent à la même étape de la partie 2, cependant, cette 
# fois-ci, nous travaillons avec un graphe pondéré (avec des poids sur les arêtes).

# Chargement des données données
df0 = pd.read_csv(r'Topologies-20240105\topology_low.csv')
df1 = pd.read_csv(r'Topologies-20240105\topology_avg.csv')
df2 = pd.read_csv(r'Topologies-20240105\topology_high.csv')

df = [df0, df1, df2]
df2 = ["low", "avg", "high"]

# Fixer une portée de 60km
portee = [60000]

def create_graph(portee, df):
    G = nx.Graph()

    for index, row in df.iterrows():
        G.add_node(row['sat_id'], pos=(row['x'], row['y'], row['z']))

    for i in range(len(df)):
        for j in range(i + 1, len(df)):
            distance = ((df.iloc[i, 1:] - df.iloc[j, 1:]) ** 2).sum() ** 0.5
            if distance < portee:
                cost = distance**2
                G.add_edge(df.iloc[i]['sat_id'], df.iloc[j]['sat_id'], weight=cost)

    pos = nx.get_node_attributes(G, 'pos')

    return pos, G

# Affichage les graphiques pour chaque configuration et niveau de portée
figures = []
costs_dict = {}
for i, portee_value in enumerate(portee):
    for j in range(len(df)):
        pos, G = create_graph(portee_value, df[j])
        fig = plt.figure()
        ax = fig.add_subplot(111, projection='3d')
        ax.set_title(f'Graphe pour la portée {portee_value}m et la configuration {df2[j]}')
        node_positions = [pos[node] for node in G.nodes()]
        xs, ys, zs = zip(*node_positions)
        ax.scatter(xs, ys, zs, label='Satellites', s=30, c='b', marker='o')
        # Affichage des arêtes
        for edge in G.edges(data=True):
            ax.plot([pos[edge[0]][0], pos[edge[1]][0]],
                    [pos[edge[0]][1], pos[edge[1]][1]],
                    [pos[edge[0]][2], pos[edge[1]][2]], c='k', alpha=0.5)
        ax.legend()

        # Affichage de la liste des coûts
        #print(f'Liste des coûts pour la configuration {df2[j]} et la portée {portee_value}m:')
        costs_dict[(df2[j], portee_value)] = {f'({edge[0]}, {edge[1]})': edge[2]["weight"] for edge in G.edges(data=True)}
        #print(costs_dict)
        figures.append(fig)
plt.show()

# Partie 2 - étape 1:
# Calcul du degré moyen - distribution de degré - clustring
figures = []
for i in portee:
    fig, axs = plt.subplots(1, len(df), figsize=(15, 4))
    for j in range(len(df)):
        pos, G = create_graph(i, df[j])
        # Calcul du degré moyen du graphe
        degree_avg = sum(dict(G.degree()).values()) / len(G)
        print(f"Degré moyen pour la porte {i}m et la configuration {df2[j]} : {degree_avg}")
        # L'histogramme de la distribution du degré
        degree_distribution = dict(G.degree())
        axs[j].hist(degree_distribution.values(), bins=range(min(degree_distribution.values()), max(degree_distribution.values()) + 1), align='left')
        axs[j].set_xlabel('Degré')
        axs[j].set_ylabel('Nombre de nœuds')
        axs[j].set_title(f'Degré pour la porte {i}m, densité {df2[j]}')
        # Calcul du degré de clustering moyen
        avg_clustering = nx.average_clustering(G)
        print(f"Degré de clustering moyen pour la porte {i}m et la configuration {df2[j]} : {avg_clustering}")
        # L'histogramme de la distribution du degré de clustering
        clustering_distribution = dict(nx.clustering(G))
        fig_clustering, ax_clustering = plt.subplots()
        ax_clustering.hist(clustering_distribution.values(), bins=20, align='left')
        ax_clustering.set_xlabel('Coefficient de clustering')
        ax_clustering.set_ylabel('Nombre de nœuds')
        ax_clustering.set_title(f'Clustering pour la porte {i}m, densité {df2[j]}')

        # Calcul du nombre de cliques et leur ordre
        cliques = list(nx.find_cliques(G))
        num_cliques = len(cliques)
        clique_order = [len(clique) for clique in cliques]
        print(f"Nombre de cliques pour la porte {i}m et la configuration {df2[j]} : {num_cliques}")
        print(f"Ordre des cliques pour la porte {i}m et la configuration {df2[j]} : {clique_order}")

        # Calcul des composantes connexes
        num_components = nx.number_connected_components(G)
        list_connexe_compo = list(nx.connected_components(G))
        component_orders = [len(component) for component in nx.connected_components(G)]
        print(f"Nombre de composantes connexes pour la porte {i}m et la configuration {df2[j]} : {num_components}")
        print(f"Ordres des composantes connexes pour la porte {i}m et la configuration {df2[j]} : {component_orders}")
        figures.append(fig_clustering)
plt.show()

def calculate_shortest_paths_histogram(graph, density):
    print(f'Densité {density}:')
    shortest_paths = dict(nx.all_pairs_dijkstra_path_length(graph, weight='weight'))
    path_lengths = []
    for source_node, lengths in shortest_paths.items():
        for target_node, length in lengths.items():
            if source_node != target_node:
                path_lengths.append(length)

    # L'histogramme des longueurs des plus courts chemins
    plt.hist(path_lengths, bins=20, align='left')
    plt.xlabel('Longueur des plus courts chemins')
    plt.ylabel('Nombre de paires de nœuds')
    plt.title(f'Distribution des plus courts chemins pour la densité {density}')
    plt.show()
    
for i in portee:
    for j in range(len(df)):
        node_positions_2d, G = create_graph(i, df[j])
        # La distribution des longueurs des plus courts chemins
        calculate_shortest_paths_histogram(G, df2[j])

def weighted_shortest_path_distribution(graph):
        shortest_paths = dict(nx.all_pairs_dijkstra_path_length(graph, weight='weight'))
        path_lengths = []
        num_nodes = len(graph.nodes)
        L = np.zeros((num_nodes + 1, num_nodes + 1))
        for source, targets in shortest_paths.items():
            for target, length in targets.items():
                target2 = int(target)
                source2 = int(source)
                L[0, target2 + 1] = target2 + 1
                L[source2 + 1, 0] = source2 + 1
                L[source2 + 1, target2 + 1] = length
                path_lengths.append(length)
        return path_lengths, L

# Le plus court chemin pour les 3 densités (low,avg,high) pour la portée 60km
for i in portee:
    fig, axs = plt.subplots(1, len(df), figsize=(15, 4))
    for j in range(len(df)):
        node_positions_2d, G = create_graph(i, df[j])
        # La distribution des longueurs des plus courts chemins
        path_lengths, L = weighted_shortest_path_distribution(G)
        print(L)
        # L'histogramme des longueurs des plus courts chemins
        axs[j].hist(path_lengths, bins=20, align='left')
        axs[j].set_xlabel('Longueur des plus courts chemins')
        axs[j].set_ylabel('Nombre de paires de noeuds')
        axs[j].set_title(f'Portée {i}m - Configuration {df2[j]}')

plt.show()

# Affichage des résultats du nombres de sauts dans le graphe
def count_shortest_paths_weighted(graph):
    path_counts = {}
    largest_component = max(nx.connected_components(graph), key=len)
    
    for source in largest_component:
        for target in largest_component:
            if source != target:
                paths = list(nx.all_shortest_paths(graph, source=source, target=target, weight='weight'))
                path_counts[(source, target)] = len(paths)
    
    return path_counts

def plot_shortest_paths_heatmap_weighted(graph):
    path_counts = count_shortest_paths_weighted(graph)
    edges, counts = zip(*path_counts.items())
    sources, targets = zip(*edges)
    df = pd.DataFrame({'Source': sources, 'Target': targets, 'Counts': counts})
    df_pivot = df.pivot(index='Source', columns='Target', values='Counts').fillna(0)
    
    return df_pivot

for i in portee:
    for j in range(len(df)):
        node_positions_2d, G_weighted = create_graph(i, df[j])
        
        fig, axs = plt.subplots(1, 1, figsize=(10, 8))
        df_pivot = plot_shortest_paths_heatmap_weighted(G_weighted)
        
        sns.heatmap(df_pivot, cmap='viridis', annot=False)
        plt.xlabel('Sommet d\'arrivée')
        plt.ylabel('Sommet de départ')
        plt.title(f'Portée {i}m - Configuration {df2[j]} (Graphe Valué)')
        
plt.show()

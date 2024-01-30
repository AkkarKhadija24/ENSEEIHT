import pandas as pd
import matplotlib.pyplot as plt
import networkx as nx
import numpy as np
import seaborn as sns


# Chargement des données données
df0 = pd.read_csv(r'Topologies-20240105\topology_low.csv')
df1 = pd.read_csv(r'Topologies-20240105\topology_avg.csv')
df2 = pd.read_csv(r'Topologies-20240105\topology_high.csv')

df = [df0, df1, df2]
df2 = ["low", "avg", "high"]

# Fixer les portées, la distance maximale pour établir une connexion
portee = [20000, 40000, 60000]

def graphe(portee, df):
    G = nx.Graph()
    for index, row in df.iterrows():
        G.add_node(row['sat_id'], pos=(row['x'], row['y'], row['z']))
    for i in range(len(df)):
        for j in range(i + 1, len(df)):
            distance = ((df.iloc[i, 1:] - df.iloc[j, 1:]) ** 2).sum() ** 0.5
            if distance < portee:
                G.add_edge(df.iloc[i]['sat_id'], df.iloc[j]['sat_id'])
    pos = nx.get_node_attributes(G, 'pos')
    return pos, G 

# Dessiner les graphes
figures = []
for i, portee_value in enumerate(portee):
    for j in range(len(df)):
        pos, G = graphe(portee_value, df[j])
        fig = plt.figure()
        ax = fig.add_subplot(111, projection='3d')
        ax.set_title(f'Graphe pour la portée {portee_value}m et la configuration {df2[j]}')
        # Les positions 3D des nœuds (les nanosatellites)
        node_positions = [pos[node] for node in G.nodes()]
        # Extraire les positions 3D de x, y et z
        xs, ys, zs = zip(*node_positions)
        ax.scatter(xs, ys, zs, label='Satellites', s=30, c='b', marker='o')
        # Affichage des arêtes
        for edge in G.edges():
            ax.plot([pos[edge[0]][0], pos[edge[1]][0]],
                    [pos[edge[0]][1], pos[edge[1]][1]],
                    [pos[edge[0]][2], pos[edge[1]][2]], c='k', alpha=0.5)
        ax.legend()
        figures.append(fig)

plt.show()

# Partie 2 - étape 1:
# Calcul du degré moyen - distribution de degré - clustring
figures = []
for i in portee:
    fig, axs = plt.subplots(1, len(df), figsize=(15, 4))
    for j in range(len(df)):
        node_positions_2d, G = graphe(i, df[j])
        # Calcul du degré moyen du graphe
        degree_avg = sum(dict(G.degree()).values()) / len(G)
        print(f"degré moyen pour la porte {i}m et la configuration {df2[j]} : ", degree_avg)
        degree_distribution = dict(G.degree())

        # L'histogramme de la distribution du degré
        axs[j].hist(degree_distribution.values(), bins=range(min(degree_distribution.values()), max(degree_distribution.values()) + 1), align='left')
        axs[j].set_xlabel('Degré')
        axs[j].set_ylabel('Nombre de nœuds')
        axs[j].set_title(f'Portée {i}m -Configuration {df2[j]}')

        # Calcul du degré de clustering moyen
        avg_clustering = nx.average_clustering(G)
        print(f"Degré de clustering moyen pour la porte {i}m et la configuration {df2[j]} : ", avg_clustering)

        # Calcul de la distribution du degré de clustering
        clustering_distribution = dict(nx.clustering(G))

        # L'histogramme de la distribution du degré de clustering
        fig_clustering, ax_clustering = plt.subplots()
        ax_clustering.hist(clustering_distribution.values(), bins=20, align='left')
        ax_clustering.set_xlabel('Coefficient de clustering')
        ax_clustering.set_ylabel('Nombre de nœuds')
        ax_clustering.set_title(f'Distribution du coefficient de clustering pour la portée {i}m et la configuration {df2[j]}')

        # Calcul du nombre de cliques et leur ordre
        cliques = list(nx.find_cliques(G))
        num_cliques = len(cliques)
        clique_order = [len(clique) for clique in cliques]

        # Affichage du résultat dans la console
        #print(f"Nombre de cliques pour la porte {i}m et la configuration {df2[j]} : ", num_cliques)
        #print(f"Ordre des cliques pour la porte {i}m et la configuration {df2[j]} : ", clique_order)

        # Calcul des composantes connexes
        num_components = nx.number_connected_components(G)
        list_connexe_compo = list(nx.connected_components(G))
        #print("Composantes connexes",list_connexe_compo)
        component_orders = [len(component) for component in nx.connected_components(G)]

        #print(f"Nombre de composantes connexes pour la porte {i}m et la configuration {df2[j]} : ", num_components)
        #print(f"Ordres des composantes connexes pour la porte {i}m et la configuration {df2[j]} : ", component_orders)
        figures.append(fig_clustering)
plt.show()

#Calcul du nombre de paires en fonction des plus courts chemins
def shortest_path_distribution(graph):
    shortest_paths = dict(nx.all_pairs_shortest_path_length(graph))
    path_lengths = []
    A = np.zeros((101,101))
    for source, targets in shortest_paths.items():
        for target, length in targets.items():
            target2 = int(target)
            source2 = int(source)
            A[0,target2+1]=target2+1
            A[source2+1,0]=source2+1
            A[source2,target2]=length
            path_lengths.append(length)
    #print(A)
    #print("\n")
    return path_lengths, A

# Calcul du plus court chemin
def count_shortest_paths(graph):
    path_counts = {}
    # La plus grande composante connexe
    largest_component = max(nx.connected_components(graph), key=len)
    for source in largest_component:
        for target in largest_component:
            if source != target:  # Pour extraire les paires de nœuds identiques
                paths = list(nx.all_shortest_paths(graph, source=source, target=target))
                path_counts[(source, target)] = len(paths)
    return path_counts

# Le plus court chemin pour les 3 portées
for i in portee:
    fig, axs = plt.subplots(1, len(df), figsize=(15, 4))
    for j in range(len(df)):
        node_positions_2d, G = graphe(i, df[j])
        path_lengths, A = shortest_path_distribution(G)
        path_counts = count_shortest_paths(G)
        # print(A)
        # L'histogramme des longueurs des plus courts chemins
        axs[j].hist(path_lengths, bins=20, align='left')
        axs[j].set_xlabel('Longueur des plus courts chemins')
        axs[j].set_ylabel('Nombre de paires de noeuds')
        axs[j].set_title(f'Portée {i}m - Configuration {df2[j]}')

plt.show()

# Affichage des résultats du nombres de sauts dans le graphe
def plot_shortest_paths_heatmap(graph):
    path_counts = count_shortest_paths(graph)
    # Sommets - nombres de plus courts chemins
    edges, counts = zip(*path_counts.items())
    sources, targets = zip(*edges)
    df = pd.DataFrame({'Source': sources, 'Target': targets, 'Counts': counts})
    # Obtenir une table de données adaptée au heatmap
    df_pivot = df.pivot(index='Source', columns='Target', values='Counts').fillna(0)
    # Tracer le heatmap avec seaborn
    return df_pivot

# Affichage du heatmap
for i in portee:
    for j in range(len(df)):
        node_positions_2d, G = graphe(i, df[j])
        fig, axs = plt.subplots(1, 1, figsize=(10, 8))
        df_pivot = plot_shortest_paths_heatmap(G)
        #sns.heatmap(df_pivot, cmap='viridis', annot=True, fmt='g')
        sns.heatmap(df_pivot, cmap='viridis', annot=False)
        plt.xlabel('Sommet d\'arrivée')
        plt.ylabel('Sommet de départ')
        # Nombre de plus courts chemins entre chaque paire de sommets
        plt.title(f'Portée {i}m - Configuration {df2[j]}')
plt.show()
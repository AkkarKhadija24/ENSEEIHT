package simplepdl.manip;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import simplepdl.Process;
import simplepdl.*;
import petriNet.*;

public class Simplepdl2petrinet {
    static PetriNetFactory factory;
    static PetriNet petri;
    static Map<String, Place> Running = new HashMap<String, Place>();
    static Map<String, Place> Ready = new HashMap<String, Place>();
    static Map<String, Place> Finished = new HashMap<String, Place>();
    static Map<String, Place> Started = new HashMap<String, Place>();
    static Map<String, Transition> Start = new HashMap<String, Transition>();
    static Map<String, Ressource> inRessource = new HashMap<String, Ressource>();
    static Map<String, Transition> Finish = new HashMap<String, Transition>();
    static Map<String, Ressource> outRessource = new HashMap<String, Ressource>();
    
	public static void main(String[] args) {
		// Charger le package SimplePDL afin de l'enregistrer dans le registre d'Eclipse.
		SimplepdlPackage packageInstanceSimplePDL = SimplepdlPackage.eINSTANCE;
		// Charger le package PetriNet afin de l'enregistrer dans le registre d'Eclipse.
		PetriNetPackage packageInstancePetriNet = PetriNetPackage.eINSTANCE;
		
		// Enregistrer l'extension ".xmi" comme devant être ouverte à 
		// l'aide d'un objet "XMIResourceFactoryImpl"
		Resource.Factory.Registry reg = Resource.Factory.Registry.INSTANCE;
		Map<String, Object> m = reg.getExtensionToFactoryMap();
		m.put("xmi", new XMIResourceFactoryImpl());
		
		// Créer un objet resourceSetImpl qui contiendra une ressource EMF (le modèle)
		ResourceSet resSet = new ResourceSetImpl();
		
		// Créer le modèle de sortie (PetriNet.xmi)
		URI SortieURI = URI.createURI("src/simplepdl/manip/P2J.xmi");
		Resource Sortie = resSet.createResource(SortieURI);
		
		// Créer un objet resourceSetImpl qui contiendra une ressource EMF (le modèle)
		ResourceSet resSetModel = new ResourceSetImpl();
		// Charger la ressource (notre modèle)
		URI modelURI = URI.createURI("src/simplepdl/manip/developpement.xmi");
		Resource resource = resSetModel.getResource(modelURI, true);
		
		// Récupérer le premier élément du modèle (élément racine)
		Process process = (Process) resource.getContents().get(0);
		
		// Instancier la fabrique
	    factory = PetriNetFactory.eINSTANCE;
	    
	    // Créer le PetriNet
	    petri = factory.createPetriNet();
	    petri.setName(process.getName());
	    Sortie.getContents().add(petri);
	    
	    for (Object o : process.getProcessElements()) {
	    	
	    	// Conversion WorkDefinition to Place
			if (o instanceof WorkDefinition) {
				WorkDefinition((WorkDefinition)o);
			}
	    	// Conversion WorkSequence to Arc
			else if (o instanceof WorkSequence) {
				WorkSequence((WorkSequence)o);
			}
	    	// Conversion Ressource to Place
			else if (o instanceof Ressource) {
				Ressource((Ressource)o);
			}
		}
	    
	    // Sauvegarde de la ressource de sortie
	    try {
	    	Sortie.save(Collections.EMPTY_MAP);
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	}

	private static void WorkDefinition(WorkDefinition wd) {
		Place PRunning= factory.createPlace();
		Place PStarted = factory.createPlace();
		Place PReady = factory.createPlace();
		Place PFinished = factory.createPlace();
		Arc ArcRunningFinish = factory.createArc();
		Arc ArcStartRunning = factory.createArc();
		Arc ArcReadyStart = factory.createArc();
		Arc ArcFinishFinished = factory.createArc();
		Arc ArcStartStarted = factory.createArc();	
		Transition TStart = factory.createTransition();
		Transition TFinish = factory.createTransition();
		
		// Initialisation du jeton des Places
		PReady.setJetons(1);
		PStarted.setJetons(0);
		PRunning.setJetons(0);
		PFinished.setJetons(0);

		//noms des Transitions
		TStart.setName(wd.getName() + "_start");
		TFinish.setName(wd.getName() + "_finish");
		
		//noms des places
		PReady.setName(wd.getName() + "_ready");
		PStarted.setName(wd.getName() + "_started");
		PFinished.setName(wd.getName() + "_finished");
		PRunning.setName(wd.getName() + "_running");
		
		//source et destination de chaque Arc
		ArcStartRunning.setSource(TStart);
		ArcStartRunning.setTarget(PRunning);
		ArcRunningFinish.setSource(PRunning);
		ArcRunningFinish.setTarget(TFinish);
		ArcFinishFinished.setSource(TFinish);
		ArcFinishFinished.setTarget(PFinished);
		ArcStartStarted.setSource(TStart);
		ArcStartStarted.setTarget(PStarted);
		ArcReadyStart.setSource(PReady);
		ArcReadyStart.setTarget(TStart);
		
		// type de chaque Arc
		ArcStartRunning.setKind(ArcKind.NORMAL);
		ArcFinishFinished.setKind(ArcKind.NORMAL);
		ArcReadyStart.setKind(ArcKind.NORMAL);
		ArcStartStarted.setKind(ArcKind.NORMAL);
		ArcRunningFinish.setKind(ArcKind.NORMAL);
		
		//jetons de chaque Arc
		ArcStartRunning.setJetons(1);
		ArcFinishFinished.setJetons(1);
		ArcStartStarted.setJetons(1);
		ArcReadyStart.setJetons(1);
		ArcRunningFinish.setJetons(1);
		
		// ajout des places, transitions et arcs à petri
		petri.getPetriNetElements().add(TFinish);
		petri.getPetriNetElements().add(TStart);
		petri.getPetriNetElements().add(PRunning);
		petri.getPetriNetElements().add(PFinished);
		petri.getPetriNetElements().add(PReady);
		petri.getPetriNetElements().add(PStarted);
		petri.getPetriNetElements().add(ArcReadyStart);
		petri.getPetriNetElements().add(ArcStartStarted);
		petri.getPetriNetElements().add(ArcRunningFinish);
		petri.getPetriNetElements().add(ArcStartRunning);
		petri.getPetriNetElements().add(ArcFinishFinished);
	
		Running.put(wd.getName(), PRunning);
		Start.put(wd.getName(), TStart);
		Finish.put(wd.getName(), TFinish);
		Ready.put(wd.getName(), PReady);
		Finished.put(wd.getName(), PFinished);
	    Started.put(wd.getName(), PStarted);
	}
	
	private static void Ressource(Ressource ressource) {
		Place PRessource = factory.createPlace();
		PRessource.setName(ressource.getName());
		PRessource.setJetons(ressource.getQuantity());
		
		// Ajout de la Place à petri
		petri.getPetriNetElements().add(PRessource);
		
		for (Amount d : ressource.getOccurences()) {
			Arc arcDemande = factory.createArc();
			arcDemande.setSource(PRessource);
			arcDemande.setTarget(Start.get(d.getActivity().getName()));
			arcDemande.setJetons(d.getValue());
			petri.getPetriNetElements().add(arcDemande);
			Arc arcRetour = factory.createArc();
			arcRetour.setSource(Finish.get(d.getActivity().getName()));
			arcRetour.setTarget(PRessource);
			arcRetour.setJetons(d.getValue());
			petri.getPetriNetElements().add(arcRetour);
		}
		
	}
	
	private static void WorkSequence(WorkSequence ws) {
		Arc arc = factory.createArc();
		switch (ws.getLinkType()) {
		case START_TO_START :
			arc.setSource(Started.get(ws.getPredecessor().getName()));
			arc.setTarget(Start.get(ws.getSuccessor().getName()));
			break;
		case START_TO_FINISH :
			arc.setSource(Started.get(ws.getPredecessor().getName()));
			arc.setTarget(Finish.get(ws.getSuccessor().getName()));
			break;
		case FINISH_TO_START :
			arc.setSource(Finished.get(ws.getPredecessor().getName()));
			arc.setTarget(Start.get(ws.getSuccessor().getName()));
			break;
		case FINISH_TO_FINISH :
			arc.setSource(Finished.get(ws.getPredecessor().getName()));
			arc.setTarget(Finish.get(ws.getSuccessor().getName()));
			break;
		default: break;
		
		}
		arc.setKind(ArcKind.READ);
		arc.setJetons(1);
		petri.getPetriNetElements().add(arc);
		
	}
}

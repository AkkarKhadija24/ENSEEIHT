import java.util.List;
import java.util.LinkedList;
import java.util.concurrent.Future;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ExecutionException;

public class MaxTabPool {

    static class PartialMax implements Callable<Integer> {
        private int start;
        private int end;
        private int[] array;

        PartialMax(int[] array, int start, int end) {
            this.array = array;
            this.start = start;
            this.end = end;
        }

        @Override
        public Integer call() {
            return LargeIntArray.max(array, start, end);
        }
    }

    /** Le tableau est découpé en numberOfTasks tronçons, chacun soumis à l'executor. */
    private static int computeMax(ExecutorService executor, int[] array, int numberOfTasks) throws InterruptedException, ExecutionException {
        int taskSize = Math.max(1, array.length / numberOfTasks); // nb d'éléments traîtés par une tâche
        List<Future<Integer>> results = new LinkedList<>();

        // Créer et soumettre les tâches.
        // Le traitement du tableau est décomposé en segement de taille taskSize : [0..taskSize[, [taskSize..2*taskSize[ etc
        // et une tâche est créée pour traiter chaque segment.
        // On fera attention que la taille du tableau n'est pas nécessairement un multiple de taskSize : le dernier segment peut être plus court (utiliser Math.min(..., array.length)).
        /* XXXX À COMPLÉTER XXXX */

        for (int i = 0; i < numberOfTasks; i++) {
            int start = i * taskSize;
            int end = Math.min((i + 1) * taskSize, array.length);
            Callable<Integer> task = new PartialMax(array, start, end);
            Future<Integer> result = executor.submit(task);
            results.add(result);
        }
        // Récupérer les résultats et les fusionner
        /* XXXX À COMPLÉTER XXXX */
        int max = Integer.MIN_VALUE;
        for (Future<Integer> result : results) {
            try {
                int partialMax = result.get(); // get() blocks until the result is available
                max = Math.max(max, partialMax);
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }
        return max;
    }
    
    public static void main(String[] args) throws Exception {
        String usage = "\nUsage : MaxTabPool <fichier> <nb essais> <taille pool> <nb tâches>\n";
        if (args.length != 4)
          throw new IllegalArgumentException(usage);
            
        String filename = args[0];
        int nbruns = Integer.parseInt (args[1]);
        int poolSize = Integer.parseInt (args[2]);
        int numberOfTasks = Integer.parseInt (args[3]);
        if (nbruns < 5)
          System.out.println("Warning: résultats peu significatifs avec moins de 5 essais.");

        int[] array = LargeIntArray.load(filename);

        Benchmark benchmark = new Benchmark();
        
        ExecutorService executor = Executors.newFixedThreadPool(poolSize);
        benchmark.runExperiments(nbruns, () -> computeMax(executor, array, numberOfTasks));
        executor.shutdown();
    }
}

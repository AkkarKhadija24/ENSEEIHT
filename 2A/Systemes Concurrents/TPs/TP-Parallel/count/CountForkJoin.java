import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ExecutionException;

public class CountForkJoin {
    static private final int VMIN = 0;
    static private final int VMAX = 9;

    static class PartialCount extends RecursiveTask<Integer> {
        private int start;
        private int end;
        private int[] array;
        private int threshold;

        PartialCount(int[] array, int start, int end, int threshold) {
            this.array = array;
            this.start = start;
            this.end = end;
            this.threshold = threshold;
        }

        /* Si l'intervalle à explorer est supérieur au seuil (threshold), on décompose
           en deux sous-tâches. Sinon, on utilise directement LargeIntArray.count. */
        /* Optimisation : si le premier élément du tronçon est supérieur à VMAX
           ou si dernier élement du tronçon est inférieur à VMIN,
           inutile de visiter le tronçon, il n'y a aucun élément dans [VMIN..VMAX] */
        public Integer compute() {
            /* XXXX À COMPLÉTER XXXX */

            int length = end - start;

            // Optimisation: Check if the range is out of bounds
            if (array[end - 1] < VMIN || array[start] > VMAX) {
                return 0;
            }

            if (length <= threshold) {
                // If the length is below or equal to the threshold, compute directly
                return LargeIntArray.count(array, start, end, VMIN, VMAX);
            } else {
                // Split the task into two subtasks
                int mid = start + length / 2;
                PartialCount left = new PartialCount(array, start, mid, threshold);
                PartialCount right = new PartialCount(array, mid, end, threshold);

                // Fork the left task and compute the right task in the current thread
                left.fork();
                int rightResult = right.compute();

                // Join the result of the left task
                int leftResult = left.join();

                // Merge the results
                return leftResult + rightResult;
            }
        }
    }
        
    private static int computeCount(ForkJoinPool fjp, int[] array, int threshold) throws InterruptedException, ExecutionException {
        PartialCount full = new PartialCount(array, 0, array.length, threshold);
        int res = fjp.invoke(full);
        return res;
    }
    
    public static void main(String[] args) throws Exception {
        String usage = "\nUsage : CountForkJoin <fichier> <nb essais> <seuil>\n";
        if (args.length != 3)
          throw new IllegalArgumentException(usage);
            
        String filename = args[0];
        int nbruns = Integer.parseInt (args[1]);
        int threshold = Integer.parseInt (args[2]);
        if (nbruns < 5)
          System.out.println("Warning: résultats peu significatifs avec moins de 5 essais.");

        int[] array = LargeIntArray.load(filename);

        Benchmark benchmark = new Benchmark();

        ForkJoinPool fjp = new ForkJoinPool();
        benchmark.runExperiments(nbruns, () -> computeCount(fjp, array, threshold));
        fjp.shutdown();
    }
}

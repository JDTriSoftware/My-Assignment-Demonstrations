import java.util.Scanner;
/**
 * The TimsOrder standalone class a majority of the work is done in this class. Has a TimsProduct member variable instantiated
 * as an array of objects. Contains a create() method to encapsulate the TimsOrder constructor and restrict instantiation.
 * Contains a private constructor.
 * @author Justin Triantafilou, 000775460
 */
public class TimsOrder {
    /**Number of products that will be ordered**/
    private int size;
    /**Name for the order **/
    private String name;
    /** Initializes a TimsProduct data type array**/
    private TimsProduct[] timsProductArray;

    /**
     * Encapsulated constructor. Instantiation is preformed through the subsequent create() method.
     * TimsOrder constructor will "construct" an order for the user, and set the order size to its own size.
     * @param size number of items on a tim's order
     * @param name name for the tim's order
     */
    private TimsOrder(int size, String name) {
        this.size = size;
        this.name = name;
        Scanner scanner = new Scanner(System.in);
        timsProductArray = new TimsProduct[size]; // Create a new TimsProduct array using the value passed
        // into the size parameter in the create() method
        for (int i = 0; i < timsProductArray.length; i ++) { // Menu loop
            System.out.println("Please use the interactive menu");
            System.out.println("Commodities: 1. Tims Mug  2. Tims Stool\nConsumables: 3. Tims Donut  4. Tims Coffee");
            int userProductChoice = scanner.nextInt(); // Menu sys.in list variable
            if (userProductChoice == 1) {
                timsProductArray[i] = TimsMug.create(); //Creates object of TimsProduct subclass based on user selection
            }
            else if (userProductChoice == 2) {
                timsProductArray[i] = TimsStool.create(); //Adds it to position [i] of the array or the "reciept"
            }
            else if (userProductChoice == 3) {
                timsProductArray[i] = TimDonut.create(); // These create methods have their own relevant dialogue
            }
            else if (userProductChoice == 4) {
                timsProductArray[i] = TimCoffee.create(); // Facilitated through polymorph methods

            }
            else {
                System.out.println("There is no validation loop you'll need to be careful with input"); // No Error handling
            }
        }
    }
    /**
     * public create method that will call the Timsorder constructor after a short dialogue with the user
     * to customize the arugments
     * @return arguementative TimsOrder (userOrder)
     */
    public static TimsOrder create() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("What is the name under the order? ");
        String userOrderName = scanner.nextLine(); // user sys.in data
        System.out.println("How many products will you be ordering? ");
        int userOrderSize = scanner.nextInt(); // user sys.in data
        TimsOrder userOrder = new TimsOrder(userOrderSize, userOrderName);
        return userOrder;
    }

    /**
     * Loops through the TimsProduct object array to call a polymorphed getRetailPrice(). This loop will also
     * output the toString of the product objects to simulate a receipt.
     * @return cumulative total of all the PRICE of the objects
     */
    public double getAmountDue() {
        double recieptTotal = 0;
        for (int i = 0; i < timsProductArray.length; i++) {
            recieptTotal += timsProductArray[i].getRetailPrice();
            System.out.println(timsProductArray[i].toString());
        }
        return recieptTotal;
    }

    /**
     * toString method to inform the user on details of the reciept
     * @return a string message with the name and size on the order
     */
    @Override
    public String toString() {
        return "The order for " + name + " has " + size + " product(s) on the receipt.\n";
    }
}

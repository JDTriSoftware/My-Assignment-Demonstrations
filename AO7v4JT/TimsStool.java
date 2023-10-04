/**
 * Subclass of TimsProduct superclass. Contains a private constructor that is called through the create() method
 * instantiate a TimsStool object.
 * @author Justin Triantafilou, 00775460
 */

import java.util.Scanner;

public class TimsStool extends TimsProduct {

    /** the number of legs a stool object can have **/
    private int numberOfLegs;

    /**
     * Private TimsStool Constructor calls its super-class constructor
     * @param name  a certain objects name
     * @param cost  a certain objects cost to make
     * @param price a certain objects price to sell
     */
    private TimsStool(String name, double cost, double price, int numberOfLegs) {
        super(name, cost, price);
        this.numberOfLegs = numberOfLegs;
    }
    /**
     * TimsStool create method. Contains a short dialogue to obtain data from the user
     * before calling the TimsStool constructor to instantiate a stool object
     * @return the new TimsStool object
     */
    public static TimsStool create() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("How much does this stool cost to produce? ");
        double userStoolCost = scanner.nextDouble();
        System.out.println("How much will this stool sell for? ");
        double userStoolPrice = scanner.nextDouble();
        System.out.println("How many legs does this stool have?");
        int userNumberOfLegs = scanner.nextInt();
        return new TimsStool("Signature Stool", userStoolCost, userStoolPrice, userNumberOfLegs);
    }

    /**
     * Getter method for number of legs
     * @return the number of legs of a stool object
     */
    public int getNumberOfLegs() {
        return numberOfLegs;
    }

    /**
     * toString of a subclass. Calls the superclass toString and concatenates its own toString for clean output
     * @return toString of stool object data
     */
    @Override
    public String toString() {
        return "This STOOL product" + super.toString() + " it has " + getNumberOfLegs() + " legs";
    }
}

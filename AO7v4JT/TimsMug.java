/**
 * Subclass of TimsProduct superclass. Contains a private constructor that is called through the create() method
 * instantiate a TimsMug object.
 * @author Justin Triantafilou, 00775460
 */

import java.awt.*; // JavaFX does not work on the machine that I coded this on.
import java.util.Scanner;

public class TimsMug extends TimsProduct {
    /** the color of the mug**/
    private Color color;
    /**
     * Private TimsMug Constructor calls its super-class constructor
     * @param name  a certain objects name
     * @param cost  a certain objects cost to make
     * @param price a certain objects price to sell
     */
    private TimsMug(String name, double cost, double price, Color color) {
        super(name, cost, price);
        this.color = color;
    }

    /**
     * TimsMug create method. Contains a short dialogue to obtain data from the user
     * before calling the TimsMug constructor to instantiate a mug object
     * @return the new TimsMug object
     */
    public static TimsMug create() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("How much does this mug cost to produce? ");
        double userMugCost = scanner.nextDouble(); // user sys.in data
        System.out.println("How much will this mug sell for? ");
        double userMugPrice = scanner.nextDouble(); // user sys.in data
        return new TimsMug("Signature Mug", userMugCost, userMugPrice, Color.RED);
    }

    /**
     * Getter for color member variable
     * @return color of a mug object
     */
    public Color getColor() {
        return color;
    }

    /**
     * toString of a subclass. Calls the superclass toString and concatenates its own toString for clean output
     * @return toString of mug object data
     */
    @Override
    public String toString() {
        return "This MUG product" + super.toString() + " it is painted " + getColor();
    }
}

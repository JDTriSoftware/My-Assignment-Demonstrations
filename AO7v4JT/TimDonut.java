/**
 * Subclass of TimsProduct superclass also implements the consumable interface directly.
 * Contains a private constructor that is called through the create() method
 * instantiate a TimsStool object.
 * @author Justin Triantafilou, 00775460
 */

import java.util.Scanner;

public class TimDonut extends TimsProduct implements Consumable {

    /** brief description of a donut**/
    private String description;
    /** caloric value of a donut**/
    private int calorieCount;


    /**
     * Private TimDonut Constructor calls its super-class constructor
     * @param name  a certain objects name
     * @param cost  a certain objects cost to make
     * @param price a certain objects price to sell
     */
    private TimDonut(String name, double cost, double price, String description, int calorieCount) {
        super(name, cost, price);
        this.description = description;
        this.calorieCount = calorieCount;
    }

    /**
     * TimDonut create method. Contains a short dialogue to obtain data from the user
     * before calling the TimDonut constructor to instantiate a donut object
     * @return the new TimDonut object
     */
    public static TimDonut create() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("How much does this donut cost to produce? ");
        double userDonutCost = scanner.nextDouble();
        System.out.println("How much will this donut sell for? ");
        double userDonutPrice = scanner.nextDouble();
        System.out.println("How many calories does this donut have? ");
        int userCalorieCount = scanner.nextInt();
        scanner.nextLine();
        System.out.println("Give a short description. ");
        String userDonutDescript = scanner.nextLine();

        return new TimDonut("Signature Donut", userDonutCost, userDonutPrice, userDonutDescript,userCalorieCount);
    }

    /**
     * Getter method for donut description
     * @return string description of the donut
     */
    public String getDescription() {
        return description;
    }

    /**
     * Getter method for calorie count. Obliges the consumable interface
     * @return calorie value of a donut object
     */
    @Override
    public int getCalorieCount() {
        return calorieCount;
    }

    /**
     * Getter method for consumption method. Obliges the consumable interface
     * @return calorie value of a donut object
     */
    @Override
    public String getConsumptionMethod() {
        return "Donuts are to be chewed";
    }

    /**
     * toString of a subclass. Calls the superclass toString and concatenates its own toString for clean output
     * @return toString of donut object data
     */
    @Override
    public String toString() {
        return "This DONUT product" + super.toString() + " it has " + getCalorieCount() + " calories, they say it is "
                + getDescription() + "\n" + getConsumptionMethod();
    }
}


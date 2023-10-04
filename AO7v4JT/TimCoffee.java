import java.util.Scanner;

public class TimCoffee extends TimsProduct implements Consumable {
    private String description;
    private int calorieCount;


    /**
     * Private TimCoffee constructor, calls its superclass constructor
     *
     * @param name  a certain objects name
     * @param cost  a certain objects cost to make
     * @param price a certain objects price to sell
     */
    private TimCoffee(String name, double cost, double price, String description, int calorieCount) {
        super(name, cost, price);
        this.description = description;
        this.calorieCount = calorieCount;
    }
    /**
     * TimCoffee create method. Contains a short dialogue to obtain data from the user
     * before calling the TimCoffee constructor to instantiate a coffe object
     * @return the new TimCoffee object
     */
    public static TimCoffee create() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("How much does this coffee cost to produce? ");
        double userDonutCost = scanner.nextDouble();
        System.out.println("How much will this coffee sell for? ");
        double userDonutPrice = scanner.nextDouble();
        System.out.println("How many calories does this coffee have? ");
        int userCalorieCount = scanner.nextInt();
        scanner.nextLine();
        System.out.println("Give a short description. ");
        String userCoffeeDescript = scanner.nextLine();

        return new TimCoffee("Signature Coffee", userDonutCost, userDonutPrice, userCoffeeDescript,userCalorieCount);
    }

    /**
     * Getter method for coffee description
     * @return string description of the coffee
     */
    public String getDescription() {
        return description;
    }

    /**
     * Getter method for calorie count. Obliges the consumable interface
     * @return calorie value of a coffee object
     */
    @Override
    public int getCalorieCount() {
        return calorieCount;
    }

    /**
     * Getter method for consumption method. Obliges the consumable interface
     * @return calorie value of a coffee object
     */
    @Override
    public String getConsumptionMethod() {
        return "Coffee is to be drank";
    }

    /**
     * toString of a subclass. Calls the superclass toString and concatenates its own toString for clean output
     * @return toString of coffee object data
     */
    @Override
    public String toString() {
        return "This COFFEE product" + super.toString() + " it has " + getCalorieCount() + " calories, they say it is "
                + getDescription() + "\n" + getConsumptionMethod();
    }
}


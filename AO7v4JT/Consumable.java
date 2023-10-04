/**
 * The consumable product interface. Assigns methods to be overridden in subclasses.
 * @author Justin Triantafilou, 000775460
 */
public interface Consumable {
    /**
     * Contract method to retrieve the calorie value
     * @return calorie count of a TimsProduct
     */
    int getCalorieCount();
    /**
     * Contract method to retrieve the consumption method
     * @return String description on how to consume
     */
    String getConsumptionMethod();
}

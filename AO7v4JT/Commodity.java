/**
 * The commodity product interface. Assigns methods to be overridden in subclasses.
 * @author Justin Triantafilou, 000775460
 */
public interface Commodity {
    /**
     * Contract method to retrieve the production cost.
     * @return The cost to produce a product
     */
    double getProductionCost();
    /**
     * Contract method to retrieve the retail price
     * @return the price a product is sold for
     */
    double getRetailPrice();

}

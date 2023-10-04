/**
 * The TimsProduct superclass. Abstract class to prevent instantiation of the generalized class.
 * @author Justin Triantafilou, 000775460
 */
public abstract class TimsProduct implements Commodity {
    /** Name of a Tim Hortons product**/
    private String name;
    /** Cost to produce a Tim Hortons product**/
    private double productionCost;
    /** Price to purchase a Tim Hortons product**/
    private double retailPrice;

    /**
     * Public TimsProduct constructor will be called four seperate times in subclasses that extend this superclass
     * @param name a certain products name
     * @param cost a certain products cost to make
     * @param price a certain products price to sell
     */
    public TimsProduct(String name, double cost, double price) {
        this.name = name;
        this.productionCost = cost;
        this.retailPrice = price;
    }

    /**
     * Getter for name member variable
     * @return name of the product
     */
    public String getName() {
        return name;
    }

    /**
     * getter for productionCost member variable
     * @return production cost of the product
     */
    @Override
    public double getProductionCost() {
        return productionCost;
    }

    /**
     * getter for retailPrice member variavle
     * @return retail price of the product
     */
    @Override
    public double getRetailPrice() {
        return retailPrice;
    }

    /**
     * Superclass toString - molded to fit the toString output of subclasses, as it is called in said toString methods
     * @return
     */
    @Override
    public String toString() {
        return " is called our " + getName() + " it costs us $" + productionCost + " to produce " +
                "and we sell it for $" + retailPrice;
    }
}

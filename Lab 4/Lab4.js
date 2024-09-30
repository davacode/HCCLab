// JavaScript source code
//Vehicle class
class Vehicle {
    // properties
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // start your engine
    startEngine() {
        return `${this.year} ${this.make} ${this.model}'s engine has started.`;
    }
}

// subclass that inherits from Vehicle
class Car extends Vehicle {
    constructor(make, model, year, fuelType, fuelCapacity, currentFuel) {
        super(make, model, year);
        this.fuelType = fuelType;
        this.fuelCapacity = fuelCapacity;
        this.currentFuel = currentFuel;
    }
}

// Motorcycle class that inherits from Vehicle
class Motorcycle extends Vehicle {
    constructor(make, model, year, engineType, topSpeed, isSportBike) {
        super(make, model, year);
        this.engineType = engineType;
        this.topSpeed = topSpeed;
        this.isSportBike = isSportBike;
    }
}

// Task#2
class Vehicle {
    #make;
    #model;
    #year;

    constructor(make, model, year) {
        this.#make = make;
        this.#model = model;
        this.#year = year;
    }
    // Encapsulation
    getMake() {
        return this.#make;
    }

    getModel() {
        return this.#model;
    }

    getYear() {
        return this.#year;
    }

    startEngine() {
        return `${this.year} ${this.#make} ${this.#model}'s engine has started.`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year, fuelType, fuelCapacity, currentFuel) {
        super(make, model, year);
        this.fuelType = fuelType;
        this.fuelCapacity = fuelCapacity;
        this.currentFuel = currentFuel;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year, engineType, topSpeed, isSportBike) {
        super(make, model, year);
        this.engineType = engineType;
        this.topSpeed = topSpeed;
        this.isSportBike = isSportBike;
    }
}

// Task #3
function operateVehicle(vehicle) {
    console.log(vehicle.startEngine());
}

const myCar = new Car("Nissan", "Altima", 2020, "Gasoline", 20, 16);
const myMotorcycle = new Motorcycle("Yamaha", "YZF-R3", 2021, "Parallel Twin", 180, true);
// Demonstrating polymorphism 
operateVehicle(myCar);        
operateVehicle(myMotorcycle); 
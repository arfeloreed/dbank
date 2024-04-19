import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";


actor DBank {
  stable var currentValue: Float = 300;
  // currentValue := 300;
  stable var startTime = Time.now();
  // startTime := Time.now();

  // let constant = 1231342;

  Debug.print(debug_show(currentValue));
  // Debug.print(debug_show(constant));

  public func topUp(amount: Float) {
    currentValue += amount;
    // Debug.print(debug_show(currentValue));
  };


  public func withdraw(amount: Float) {
    let tempValue: Float = currentValue - amount;

    if (tempValue >= 0) {
      currentValue -= amount;
      // Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Error on operation: tempValue is below 0.");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  // get currentValue with interest
  public func totalValue() {
    let currentTime = Time.now();
    let timeNS = currentTime - startTime;
    let timeSec = timeNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeSec));
    startTime := currentTime;
  }

  // topUp();
}
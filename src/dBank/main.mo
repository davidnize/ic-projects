import Debug "mo:base/Debug"

actor dbank {
 var currentNum = 200;

  currentNum := 100;
  
  Debug.print(debug_show(currentNum))
}
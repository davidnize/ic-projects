import Debug "mo:core/Debug";

persistent actor dbank {
  transient var currentNum = 200;

  currentNum := 100;

  Debug.print(debug_show(currentNum));
}
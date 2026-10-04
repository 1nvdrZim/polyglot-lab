# Lesson 01 - variables, types, functions, formatting.
# Python is dynamically typed: names have no declared type, values do.
# The type hints below are optional documentation; Python does not enforce them.


def average(values: list[float]) -> float:
    return sum(values) / len(values)


name = "Polyglot Lab"
print(f"Hello, {name}!")

readings = [18.5, 21.0, 23.5, 19.0, 24.5]
print(f"Readings: {len(readings)}")
print(f"Average: {average(readings):.1f}")

# `/` always gives a float in Python 3. Integer division is its own operator.
print(f"7 / 2 = {7 // 2} (integer)")
print(f"7 / 2 = {7 / 2} (floating point)")

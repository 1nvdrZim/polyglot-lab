# Test runner for Python solutions.
#   python -u runner.py <solution.py> <function name> <tests.json> <first test>
# It prints one "@@" line per test for the tool to read. Anything else that
# reaches standard output is shown to you as your own debug output.

import importlib.util
import json
import sys
import traceback


def describe(error):
    text = " ".join(f"{type(error).__name__}: {error}".split())
    for frame in reversed(traceback.extract_tb(error.__traceback__)):
        if frame.filename.endswith("solution.py"):
            return f"{text} (solution.py line {frame.lineno})"
    return text


def load(solution_path, function_name):
    spec = importlib.util.spec_from_file_location("solution", solution_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    function = getattr(module, function_name, None)
    if not callable(function):
        raise LookupError(f"solution.py must define a function named {function_name}")
    return function


def main():
    solution_path, function_name, tests_path, start = sys.argv[1:5]
    try:
        function = load(solution_path, function_name)
    except SyntaxError as error:
        print(f"@@LOAD SyntaxError: {error.msg} (solution.py line {error.lineno})", flush=True)
        return
    except LookupError as error:
        print(f"@@LOAD {error}", flush=True)
        return
    except Exception as error:
        print(f"@@LOAD {describe(error)}", flush=True)
        return

    with open(tests_path, encoding="utf-8") as file:
        tests = json.load(file)

    for index in range(int(start), len(tests)):
        print(f"@@BEGIN {index}", flush=True)
        try:
            result = function(*tests[index])
            line = f"@@RESULT {index} j {json.dumps(result, default=repr)}"
        except Exception as error:
            line = f"@@ERROR {index} {describe(error)}"
        print(line, flush=True)


main()

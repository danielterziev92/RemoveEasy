#!/bin/sh
# Run Django tests and output results

# Set -e to exit on error
set -e

# Define test results file
TEST_RESULTS_FILE=${1:-"$APP_HOME/test_results.txt"}

echo "Running Django tests..."

# Run tests with error handling
set +e  # Don't exit on error
python manage.py test
TEST_EXIT_CODE=$?
set -e  # Re-enable exit on error

# Show test results and save to file if there are errors
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ All tests passed successfully!"
else
    echo "❌ Some tests failed!"
    
    # Create a file with test results only if tests failed
    python manage.py test > "$TEST_RESULTS_FILE" 2>&1
    echo "Test results saved to: $TEST_RESULTS_FILE"
fi

# Return the original test exit code
exit $TEST_EXIT_CODE
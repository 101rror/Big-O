export const codeExamples = {
  constant: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> array = {1,2,3,4,5,6};
    std::cout << "Third position: " << array[3] << std::endl;
    return 0;
}`,

  logarithmic: `int binarySearch(const std::vector<int>& array, int target) {
    int left = 0;
    int right = array.size() - 1;

    while (left <= right) {
        int middle = left + (right - left) / 2;
        int value = array[middle];

        if (value == target)
            return middle;
        else if (value < target)
            left = middle + 1;
        else
            right = middle - 1;
    }
    return -1;
}`,

  linear: `int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}`,

  logLinear: `int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}`,

  quadratic: `std::vector<int> bubbleSort(std::vector<int> arr) {
    int n = arr.size();

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
    return arr;
}`,

  exponential: `#include <vector>
#include <cmath>
#include <limits>

struct City {
    double x, y;
};

double distance(const City& city1, const City& city2) {
    double dx = city1.x - city2.x;
    double dy = city1.y - city2.y;
    return std::sqrt(dx*dx + dy*dy);
}

void tspHelper(const std::vector<City>& cities, std::vector<int>& tour, std::vector<bool>& visited, int n, double& shortestLength, std::vector<int>& shortestTour) {
    if (tour.size() == n) {
        double tourLength = 0.0;
        for (int i = 0; i < n; i++) {
            tourLength += distance(cities[tour[i]], cities[tour[(i+1) % n]]);
        }
        if (tourLength < shortestLength) {
            shortestLength = tourLength;
            shortestTour = tour;
        }
    } else {
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                tour.push_back(i);
                visited[i] = true;
                tspHelper(cities, tour, visited, n, shortestLength, shortestTour);
                visited[i] = false;
                tour.pop_back();
            }
        }
    }
}

std::pair<std::vector<int>, double> tsp(const std::vector<City>& cities) {
    int n = cities.size();
    std::vector<int> shortestTour;
    double shortestLength = std::numeric_limits<double>::infinity();
    std::vector<int> tour;
    std::vector<bool> visited(n, false);
    tspHelper(cities, tour, visited, n, shortestLength, shortestTour);
    return {shortestTour, shortestLength};
}`,

  factorial: `#include <vector>
#include <algorithm>
#include <limits>

std::vector<int> travelingSalesmanProblem(const std::vector<std::vector<int>>& graph, int startVertex) {
    int n = graph.size();
    std::vector<int> vertices;
    for (int i = 0; i < n; i++) {
        if (i != startVertex) vertices.push_back(i);
    }

    int minDistance = std::numeric_limits<int>::max();
    std::vector<int> minPath;

    std::function<void(std::vector<int>&, int, int)> permute = [&](std::vector<int>& arr, int l, int r) {
        if (l == r) {
            int currentDistance = graph[startVertex][arr[0]];
            for (int i = 0; i < arr.size() - 1; i++) {
                currentDistance += graph[arr[i]][arr[i + 1]];
            }
            currentDistance += graph[arr.back()][startVertex];
            if (currentDistance < minDistance) {
                minDistance = currentDistance;
                minPath = {startVertex};
                minPath.insert(minPath.end(), arr.begin(), arr.end());
                minPath.push_back(startVertex);
            }
        } else {
            for (int i = l; i <= r; i++) {
                std::swap(arr[l], arr[i]);
                permute(arr, l + 1, r);
                std::swap(arr[l], arr[i]);
            }
        }
    };

    permute(vertices, 0, n - 2);

    return minPath;
}`
};

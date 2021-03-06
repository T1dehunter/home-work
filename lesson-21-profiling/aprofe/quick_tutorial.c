#include <stdlib.h>
#include <time.h>
#include <stdio.h>

int partition(int v[], int a, int b) {
	int pivot = a;
	for (;;) {
		while (a < b && v[a] <= v[pivot]) a++;
		while (v[b] > v[pivot]) b--;
		if (a >= b) break;
		int temp = v[a];
		v[a] = v[b];
		v[b] = temp;
	}
	if (v[b] != v[pivot]) {
		int temp = v[b];
		v[b] = v[pivot];
		v[pivot] = temp;
	}
	return b;
}

void quick_sort_ric(int v[], int a, int b) {
	int m;
	if (a >= b) return;
	m = partition(v, a, b);
	quick_sort_ric(v, a, m-1);
	quick_sort_ric(v, m+1, b);
}

int main() {

	int v[1024*10];
	srand(time(0));
	int n = sizeof(v)/sizeof(int);
	int j = n, i = 0;

	for (j = 0; j < n; j += 100) {

		for (i = 0; i < j; i++)
			v[i] = rand() % (j+1);

		quick_sort_ric(v, 0, j-1);
	}

	printf("End\n");

	return 0;
}
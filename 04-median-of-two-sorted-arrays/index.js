/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2) {
  const mergedArray = nums1.concat(nums2);

  mergeSort(mergedArray, 0, mergedArray.length - 1);

  const midpoint = mergedArray.length / 2;

  if (!Number.isInteger(midpoint)) {
    return mergedArray[Math.floor(midpoint)];
  }

  return (mergedArray[midpoint] + mergedArray[midpoint - 1]) / 2;
};

function merge(array, leftPointer, midpointPointer, rightPointer) {
  const n1 = midpointPointer - leftPointer + 1;
  const n2 = rightPointer - midpointPointer;

  // Create temp arrays
  const _tempLeftArray = new Array(n1);
  const _tempRightArray = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) {
    _tempLeftArray[i] = array[leftPointer + i];
  }
  for (let j = 0; j < n2; j++) {
    _tempRightArray[j] = array[midpointPointer + 1 + j];
  }

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = leftPointer;

  while (i < n1 && j < n2) {
    if (_tempLeftArray[i] <= _tempRightArray[j]) {
      array[k] = _tempLeftArray[i];
      i++;
    } else {
      array[k] = _tempRightArray[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    array[k] = _tempLeftArray[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    array[k] = _tempRightArray[j];
    j++;
    k++;
  }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(array, leftPointer, rightPointer) {
  if (leftPointer >= rightPointer) {
    return; //returns recursively
  }
  const m = leftPointer + parseInt((rightPointer - leftPointer) / 2);
  mergeSort(array, leftPointer, m);
  mergeSort(array, m + 1, rightPointer);
  merge(array, leftPointer, m, rightPointer);
}

const median = findMedianSortedArrays([4, 3], [2, 1]);

console.log('median ', median);

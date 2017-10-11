<?php
function max_heapify(&$arr, $p, $len) {
	$l = $p * 2 + 1;
	$r = $p * 2 + 2;
	if ($l < $len && $arr[$l] > $arr[$p]) {
		$largest = $l;
	} else {
		$largest = $p;
	}
	if ($r < $len && $arr[$r] > $arr[$largest]) {
		$largest = $r;
	}
	if ($largest != $p) {
		$tmp = $arr[$p];
		$arr[$p] = $arr[$largest];
		$arr[$largest] = $arr[$p];
		max_heapify($arr, $largest, $len);
	}
}

function heap_sort($arr) {
	$len = count($arr);
	if ($len <= 1) {
		return $arr;
	}

	$p = ceil($len / 2);
	for ($i = $p; $i >= 0; $i--) {
		max_heapify($arr, $i, $len);
		var_dump($arr);
	}

	for ($i = $len - 1; $i >= 0; $i--) {
		$max = $arr[0];
		$arr[0] = $arr[$i];
		$arr[$i] = $max;
		max_heapify($arr, 0, $i);
	}
	return $arr;
}

var_dump(heap_sort([7, 6, 5, 4, 9, 0, 3, 2, 1]));

?>
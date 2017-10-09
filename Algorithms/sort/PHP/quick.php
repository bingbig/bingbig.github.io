<?php

function quick_sort($array = []) {
	$length = count($array);
	if ($length <= 1) {
		return $array;
	}
	_sort($array, 0, $length - 1);
	return $array;
}

function _sort(&$array, $left, $right) {
	if ($left > $right) {
		return;
	}

	$p = $left;
	$i = $left;
	$j = $right;

	while ($i < $j) {
		while ($j > $i && $array[$p] < $array[$j]) {
			$j--;
		}

		while ($i < $j && $array[$i] < $array[$p]) {
			$i++;
		}

		if ($i < $j) {
			$tmp = $array[$i];
			$array[$i] = $array[$j];
			$array[$j] = $tmp;
		}
	}

	if ($array[$i] < $array[$p]) {
		$tmp = $array[$p];
		$array[$p] = $array[$i];
		$array[$i] = $tmp;
	}

	_sort($array, $left, $i - 1);
	_sort($array, $i + 1, $right);
}

var_dump(quick_sort([7, 6, 5, 4, 9, 0, 3, 2, 1, 10, 15, 13, 12, 11]));
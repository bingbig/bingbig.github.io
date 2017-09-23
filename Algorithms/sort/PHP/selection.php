<?php

function selection_sort($array) {
	$length = count($array);
	if ($length <= 1) {
		return $array;
	}

	for ($i = 0; $i < $length; $i++) {
		for ($j = $i + 1; $j < $length; $j++) {
			if ($array[$j] < $array[$i]) {
				$min = $array[$j];
				$array[$j] = $array[$i];
				$array[$i] = $min;
			}
		}
	}

	return $array;
}

var_dump(selection_sort([7, 6, 5, 4, 9, 0, 3, 2, 1]));
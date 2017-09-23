<?php
# sort from min to max

function bubble_sort($array) {
	$length = count($array);
	if ($length <= 1) {
		return $array;
	}

	$i = 0;
	while ($i < $length) {
		for ($j = 1; $j < $length - $i; $j++) {
			if ($array[$j - 1] > $array[$j]) {
				$tmp = $array[$j];
				$array[$j] = $array[$j - 1];
				$array[$j - 1] = $tmp;
			}
		}
		$i++;
	}

	return $array;
}

var_dump(bubble_sort([7, 6, 5, 4, 9, 0, 3, 2, 1]));

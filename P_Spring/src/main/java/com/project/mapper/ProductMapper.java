package com.project.mapper;


import java.util.ArrayList;

import com.project.dto.ProductDto;

public interface ProductMapper {
	public void productAdd(ProductDto productDto);
	public ArrayList<ProductDto> productList();
}
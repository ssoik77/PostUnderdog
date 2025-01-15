package com.project.mapper;


import java.util.ArrayList;
import java.util.List;

import com.project.dto.ProductDto;

public interface ProductMapper {
	public void productAdd(ProductDto productDto);
	public ArrayList<ProductDto> productList();
	public void productEdit(List<ProductDto> list);
	public void productDelete(List<ProductDto> list);
}
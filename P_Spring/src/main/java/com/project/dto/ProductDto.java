package com.project.dto;


import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDto {
	MultipartFile product_image;
	
	int product_code; 
	String product_image_url;
	String product_name;
	String product_price;
	String product_price_unit; 
	String product_cost;
	String product_cost_unit; 
	String product_discount;
	String product_first_category; 
	String product_second_category; 
	boolean product_selling;
	
	@Builder
	public ProductDto(MultipartFile product_image, String product_name, String product_price, String product_price_unit,
			String product_cost, String product_cost_unit, String product_discount, String product_first_category,
			String product_second_category, boolean product_selling) {
		super();
		this.product_image = product_image;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_price_unit = product_price_unit;
		this.product_cost = product_cost;
		this.product_cost_unit = product_cost_unit;
		this.product_discount = product_discount;
		this.product_first_category = product_first_category;
		this.product_second_category = product_second_category;
		this.product_selling = product_selling;
	}

	@Builder
	public ProductDto(int product_code, String product_image_url, String product_name, String product_price,
			String product_price_unit, String product_cost, String product_cost_unit, String product_discount,
			String product_first_category, String product_second_category, boolean product_selling) {
		this.product_code = product_code;
		this.product_image_url = product_image_url;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_price_unit = product_price_unit;
		this.product_cost = product_cost;
		this.product_cost_unit = product_cost_unit;
		this.product_discount = product_discount;
		this.product_first_category = product_first_category;
		this.product_second_category = product_second_category;
		this.product_selling = product_selling;
	}
	

	
}

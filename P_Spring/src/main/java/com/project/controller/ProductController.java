package com.project.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.dto.ProductDto;
import com.project.service.ProductService;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/product/*", produces = "application/text; charset=utf8")
@Service
@Log4j
public class ProductController {

	ProductService product_service;

	@Autowired
	public ProductController(ProductService productService) {
		this.product_service = productService;
	}

	@PostMapping("/add")
	@Transactional
	void productAdd(@ModelAttribute ProductDto productDto) {
		System.out.println("image: " + productDto.getProduct_image());
		log.info(productDto);
		String imagePath;
		try {
			imagePath = product_service.productImageAdd(productDto.getProduct_image());
			productDto.setProduct_image_url(imagePath);
			log.info("이미지 업로드 후: " + productDto);
			product_service.productAdd(productDto);
		} catch (IOException e) {
			System.out.println(e);
		}
	}

	@PostMapping("/list")
	@Transactional
	@ResponseBody
	String productList() {
		String json = "";
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			json = objectMapper.writeValueAsString(product_service.productList());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return json;
	}

	@PostMapping("/edit")
	@Transactional
	@ResponseBody
	void productEdit(@RequestBody List<ProductDto> productDto) {
		log.info(productDto);
//		String json = "";
//		try {
//			ObjectMapper objectMapper = new ObjectMapper();
//			json = objectMapper.writeValueAsString(product_service.productList());
//		} catch (JsonProcessingException e) {
//			e.printStackTrace();
//		}
//		return json;
	}

}

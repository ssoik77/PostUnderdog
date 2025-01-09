package com.project.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


import org.springframework.stereotype.Service;

import com.project.dto.ProductDto;

@Service
public class ProductService {

    public void productAdd(ProductDto productDto) {
    	 // 사용자 홈 디렉터리 가져오기
    	String userHome = System.getProperty("user.home");
    	System.out.println("user Path: " + userHome);
    	// Document 디렉터리 경로 생성
        Path uploadPath = Paths.get(userHome, "Documents", "PostUnderdog", "ProductImage");
        System.out.println("Upload Path: " + uploadPath);

        // 디렉토리 존재 여부 확인 및 생성
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to create upload directory", e);
            }
        }

        // 파일 이름 생성 (UUID + 확장자)
        String originalFilename = productDto.getProduct_image().getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        Path filePath = uploadPath.resolve(uniqueFilename);

        // 파일 저장
        try {
            Files.write(filePath, productDto.getProduct_image().getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }
}

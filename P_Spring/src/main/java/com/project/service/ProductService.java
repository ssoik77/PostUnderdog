package com.project.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.project.dto.ProductDto;
import com.project.mapper.ProductMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class ProductService {

    private static final String BUCKET_NAME = "project-product-image";
    private static final String PROJECT_ID = "reflected-song-447400-n5";

    ProductMapper product_mapper;
    
    @Autowired
    public ProductService(ProductMapper product_mapper) {
		this.product_mapper = product_mapper;
	}

	public void productAdd(ProductDto productDto) {
		product_mapper.ProductAdd(productDto);
    }

    public String productImageAdd(MultipartFile image) throws IOException {
    	 // 서비스 계정 JSON 파일 경로
        String credentialsPath = "C:/kang/workspace/TeamProject/reflected-song-447400-n5-f030613aa1f0.json";
    	
        // Google Cloud Storage 클라이언트 초기화
        Storage storage = StorageOptions.newBuilder()
        	.setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(credentialsPath)))
            .setProjectId(PROJECT_ID)
            .build()
            .getService();

        String originalFilename = image.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));

        // 지원 파일 형식 검증
        List<String> allowedExtensions = Arrays.asList(".jpg", ".jpeg", ".png", ".gif");
        if (!allowedExtensions.contains(fileExtension.toLowerCase())) {
            throw new IllegalArgumentException("지원되지 않는 파일 형식: " + fileExtension);
        }

        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        // 업로드할 객체의 식별자 생성
        BlobId blobId = BlobId.of(BUCKET_NAME, uniqueFilename);

        // 객체 정보 설정 (MIME 타입 포함)
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
            .setContentType(image.getContentType()) // MIME 타입 설정
            .build();

        try {
            // 파일 업로드
            storage.create(blobInfo, image.getBytes());
            log.info(String.format("파일 업로드 성공: [파일명: %s, 버킷: %s, URL: %s]", uniqueFilename, BUCKET_NAME, 
                "https://storage.googleapis.com/" + BUCKET_NAME + "/" + uniqueFilename));
            return "https://storage.googleapis.com/" + BUCKET_NAME + "/" + uniqueFilename;
        } catch (Exception e) {
            log.error("파일 업로드 중 오류 발생: " + e.getMessage(), e);
            throw new IOException("Google Cloud Storage 업로드 실패", e);
        }
    }
}

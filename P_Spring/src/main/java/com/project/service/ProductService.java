package com.project.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
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
		product_mapper.productAdd(productDto);
    }
	
	//이미지 저장 후 url반환 함수
    public String productImageAdd(MultipartFile image) throws IOException {
    	
        // Google Cloud Storage 클라이언트 초기화
        Storage storage = StorageOptions.newBuilder()
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
    
    public ArrayList<ProductDto> productList () {
    	return product_mapper.productList(); 
    }
    
    public void productEdit (List<ProductDto> productDto) {
    	product_mapper.productEdit(productDto);
    }
    
    public void productDelete(List<ProductDto> productDto) {
    	log.info(productDto);
        // Google Cloud Storage 클라이언트 초기화
        Storage storage = StorageOptions.newBuilder()
                .setProjectId(PROJECT_ID).build().getService();

        for (ProductDto imgUrl : productDto) {
            String url = imgUrl.getProduct_image_url();
            // URL에서 이미지 이름 추출 (이 부분은 URL 형식에 따라 더 안전하게 처리해야 할 수 있음)
            String imgName = url.substring(url.lastIndexOf("/") + 1);
            
            // Google Cloud Storage에서 객체 가져오기
            Blob blob = storage.get(BUCKET_NAME, imgName);
            
            // Blob이 null인지 확인 후 삭제
            if (blob != null) {
                BlobId idWithGeneration = blob.getBlobId();
                // 이미지 삭제
                storage.delete(idWithGeneration);
                System.out.println("Deleted image: " + imgName);
            } else {
                System.out.println("Image not found: " + imgName);
            }
        }

        // 데이터베이스에서 제품 삭제
        product_mapper.productDelete(productDto);
    }

    
}

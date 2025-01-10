package com.project.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.project.dto.ProductDto;
import lombok.extern.log4j.Log4j;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
@Log4j
public class ProductService {
	
	
//    public void productAdd(ProductDto productDto) throws IOException {
//        
//    	 final String BUCKET_NAME = "project-product-image";
//         final String projectId = "reflected-song-447400-n5";
//    	
//        // Google Cloud Storage 클라이언트 초기화
//        Storage storage = StorageOptions.newBuilder()
//            .setProjectId(projectId)  // Google Cloud 프로젝트 ID 설정
//            .build()
//            .getService();
//
//        String originalFilename = productDto.getProduct_image().getOriginalFilename();
//        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
//        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
//        
//        // 업로드할 객체의 식별자 생성
//        BlobId blobId = BlobId.of("project-product-image", uniqueFilename);
//
//        // 객체 정보 설정
//        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
//
//        // 경합 방지 및 데이터 보호를 위한 조건 설정
//        Storage.BlobWriteOption precondition;
//        if (storage.get("project-product-image", uniqueFilename) == null) {
//            // 객체가 아직 존재하지 않는 경우
//            precondition = Storage.BlobWriteOption.doesNotExist();
//        } else {
//            // 객체가 이미 존재하는 경우 generation-match 조건 설정
//            precondition = Storage.BlobWriteOption.generationMatch(
//                storage.get("project-product-image", uniqueFilename).getGeneration());
//        }
//
//        // 파일 업로드
//        Path path = Paths.get(file_path.toString());
//        storage.createFrom(blobInfo, path, precondition);
//
//        // 업로드 완료 메시지 출력
//        log.info("File " + file_path + " uploaded to bucket " + "project-product-image" + " as " + uniqueFilename);
//    }
}

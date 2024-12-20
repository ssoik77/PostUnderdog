package com.project.mapper;

<<<<<<< HEAD
import com.project.dto.RegisterDto;

public interface FindMapper {
	String pwFind(RegisterDto registerDto);
=======
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface FindMapper {

	// 사용자 정보를 기준으로 비밀번호를 가져오는 메소드
	@Select("SELECT m_pw FROM member_info WHERE m_id = #{e_name} AND m_birth = #{e_birthdate} AND m_tel_num = #{e_tel_num}")
	String getPasswordByInfo(String e_name, String e_birthdate, String e_tel_num);
>>>>>>> 7c3a438c7d31201220158dcbfad847082ea8784e
}

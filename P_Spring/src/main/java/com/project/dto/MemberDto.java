package com.project.dto;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MemberDto {

    // 데이터베이스 연결 정보
    private static final String DB_URL = "jdbc:mysql://localhost:3306/post_underdog";  // 데이터베이스 URL
    private static final String DB_USER = "root"; // 데이터베이스 사용자 이름
    private static final String DB_PASSWORD = "root"; // 데이터베이스 비밀번호
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver"; // MySQL JDBC 드라이버

    // 데이터베이스 연결을 관리하는 메서드
    public static Connection getConnection() throws SQLException {
        try {
            // MySQL JDBC 드라이버 로딩
            Class.forName(JDBC_DRIVER);
            // 데이터베이스 연결
            return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            throw new SQLException("JDBC 드라이버 로딩 실패", e);
        }
    }

    // 연결 종료를 위한 메서드 (필요시 사용)
    public static void closeConnection(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}

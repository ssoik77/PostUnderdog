package com.project.servlet;

import com.project.dto.MemberDto;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/Register") // 이 서블릿은 "/Register" URL로 접근할 때 사용됩니다.
public class RegiServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // CORS 처리 - 클라이언트가 다른 도메인에서 서버에 요청할 때의 권한 설정
    private void setCorsHeaders(HttpServletResponse response) {
        // 모든 출처에서 요청을 허용
        response.setHeader("Access-Control-Allow-Origin", "*");
        // GET, POST, OPTIONS HTTP 메서드를 허용
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        // 요청 헤더로 'Content-Type', 'Origin', 'X-Requested-With'를 허용
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, X-Requested-With");
        // 쿠키 및 인증 정보 전송 허용
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // OPTIONS 메서드에 대한 응답을 처리 - 브라우저가 CORS 검사를 할 때 OPTIONS 요청을 보내는 경우
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);  // CORS 설정 호출

        // 클라이언트에서 'username' 파라미터를 받는다.
        String username = request.getParameter("username");

        // 'username'이 비어 있거나 null일 경우, 잘못된 요청 처리
        if (username == null || username.trim().isEmpty()) {
            sendJsonResponse(response, HttpServletResponse.SC_BAD_REQUEST, "아이디를 입력해주세요.");
            return;
        }

        // DB 연결 및 중복 아이디 확인
        try (Connection conn = MemberDto.getConnection()) {
            // 아이디가 이미 존재하는지 확인하는 메서드 호출
            if (isUsernameExist(conn, username)) {
                // 아이디가 존재하면, 사용 불가능한 아이디 메시지 전송
                sendJsonResponse(response, HttpServletResponse.SC_OK, "이미 존재하는 아이디입니다.");
            } else {
                // 아이디가 존재하지 않으면, 사용 가능한 아이디 메시지 전송
                sendJsonResponse(response, HttpServletResponse.SC_OK, "사용 가능한 아이디입니다.");
            }
        } catch (SQLException e) {
            // DB 오류 발생 시 예외 처리 및 오류 메시지 전송
            e.printStackTrace();
            sendJsonResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다.");
        }
    }

    // DB에서 중복 아이디를 확인하는 메서드
    private boolean isUsernameExist(Connection conn, String username) throws SQLException {
        // 중복 아이디 확인을 위한 SQL 쿼리
        String sql = "SELECT COUNT(*) FROM member_info WHERE m_id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);  // 파라미터로 받은 username을 쿼리에 설정

            try (ResultSet rs = stmt.executeQuery()) {
                // 결과가 1개 이상이면 아이디가 중복된 것
                return rs.next() && rs.getInt(1) > 0;
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);  // CORS 설정 호출
        // POST 메소드로 회원 가입 등을 처리할 코드 추가 예정
    }

    // JSON 형식으로 응답을 보내는 헬퍼 메서드
    private void sendJsonResponse(HttpServletResponse response, int statusCode, String message) throws IOException {
        // 응답 코드와 Content-Type 설정
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // JSON 응답 메시지 생성
        String jsonResponse = String.format("{\"message\":\"%s\"}", message);
        // 응답에 메시지 작성
        response.getWriter().write(jsonResponse);
    }
}

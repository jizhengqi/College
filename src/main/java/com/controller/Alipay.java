package com.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.entity.Users;
import com.service.UsersService;

@Controller
@RequestMapping("alipay")
public class Alipay {
	
	@Resource
	UsersService us;
	
	Integer rs;
	
	@RequestMapping("notify_url")
    public void notify_url(String s_on,String money,HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws ServletException, IOException {
        String app_id = "2016091300503863";
        
        String sign_type = "RSA2";
        
        String charset = "utf-8";
        
        String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
        
        String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCGecMr4dnZxM2G5PehCsHT3uQ/3/eNfe26n0+5AZULVXKhWi90th2FVCOBDXMFUGB0HKQX4MXaAOcNzpJ36f82X8doi+SiP+ubV0TT0vZoOM+foCQhTmdMlfnIDJT4rsDculIq2SpbWM+H4ErkomjWQlXsVoZHNM1P/K6BO8PAs2FcInSdYMYvbGoLEMYmXmUvi+VX0hDhUUrX7pwzktEmUF/C7FiR11RHz6ExHfDZ9TDDxiQ5gZakSy3velxj2x39bBqYon+7kMYrGwglOdkMY52c1/xaPOVb69yvp7Vhu+XCr06Q33iIKg0F4wywqnqYyMRuwDcgBX2rNtREePBtAgMBAAECggEANFmogifNMDquLCpswFO4uytVPgyJiZqRdopYddRI2n2sP2YlfVD8UxA7Nh0vPs1YjzsrImSNgV3ClRxq5qXAhcFplqiHHCa4KOQjVjcVV+Nt6F1mU1T7X9QuxhMn11volsUuAaJDHAaJ3AKUBUe4elierH/OjF/g4Zejs4m5ngVhv+/NfvT/MXhuHsR+pak7a6vfHYzmVKMSeLkWZ75IP6znJ4SdQM+ANSR1d1WdeMtCZMB36hXI+Ik9Dr05ZjKpKXE2gzbRVpCY7mn7c99o8kLikisgcTbw+IcDo5P75GtKYP+bTOGLWOKFe70toWE+t1ipTFrnKBFRCZ9zMbiRfQKBgQDwK4ogu8zbd/WhuArGyKNod1AEVolQOVif2AWWOk9d+Q0UbfDfCVX9icARYPJzsFRgmXk80HDGzaz/SCVH07pEvtnmDBvDmjql/Hqzr8/vrxSvnx92zWFP13WF/1rxjFGe5AV7A8fPMpPETuhg3hE227R9LhPAsXiNgrOhTaMU7wKBgQCPVs8zJv+xDlfPtRnAITImvlJY8DnfiSR+7pNkGvN6a/6aPvW1GfZGq99PzDShxd8xec/fU9EDtiAZCliUsbjNKY5SkRGFYV1a9jcnYHvk/i/OOPw3M1b2JCAA6Ub7CYfKBclXKd3kkkO61HkJdIzhre8YdBOMPwtbUCHcMAWoYwKBgQDYSo3J7veOCxm2e7WQ0i5/rTvtvDVLf2m2Amj9oyPJALrr1Bsh8hl0DPNhc0rGL1295VmPEDUQhTgwazvP1PkiYjKAgBUc8i+xPpEOc94zAB0EEKzYZBwoOGUJuS+g63qyOq5I2929VtJG771NR5B/NBv2xGFbnzhvUO8O7IlbFwKBgHlT4ISKwSlsW5Wb1FUVhC7ZMDjJ9iKpIfQzGx1D1s3L9bE4E6CcfiJpvtb7oZ1BMN/fHL4LY0NB+L9ZS4tpN2SphSeMVYlR1cR13k99UsGNCogDIjHTSguEnnZG/ubktUSiSz91V7XuvFe7G0yOk+U+5cAMGLPAdWtwU4jeORvDAoGAPYRqGzVqfANMvjdOlZ8pEjUmwJyFhpNPEGwV0JHSj8sZ1XYP7tl9BdwdaAq2kHhN7PFWDo/ikDzqQJLbM3HnGNcjb2J/hq/bOOwEtXqurgeW9VckyWQDvYsWvz/1kby1LvzLVp3LzC5HodYPA4MWkmc0pEJ52BziS6U/j0rT4f0=";
        
        String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw6nmLwdUwi4vOqrYPR+uNVw72aA9V6uSaA3z8hbyR3yqng6Z/jjkdGLiF9W1Ny4dPeLLcUO4ZeQ8r7IQHsgZsw2UixP1sxyz2jNhNQW189a/tqOTxj8E0cwEyR9W9A2wpj6NkGLa6CJT51M/tv/jM7D/nhQvvQOv6Ct+SKXqYqlPOlrXAFP6aAT3gnE/1/MP/u97bO0peedA9/DMeLapiKHHkYYGQaD8jOCQnFuChLRhcxvFBtEodJ9Tiw1SSbYKvRaFFbbmHB+ewuQL9i9l5EmWNxrGwXDh8jNuwnvuHokb7nA0b1t1yxJv1mIjBr/e9ftbG9Rf77VurCBiFyvt7QIDAQAB";

        AlipayClient alipayClient = new DefaultAlipayClient(gatewayUrl, app_id, merchant_private_key, "", charset, alipay_public_key, sign_type); // 获得初始化的AlipayClient
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();// 创建API对应的request
        
        alipayRequest.setReturnUrl("http://localhost:8080/alipay/success");
        alipayRequest.setNotifyUrl("http://localhost:8080/alipay/notify_url");// 在公共参数中设置回跳和通知地址
        alipayRequest.setBizContent("{" + "    \"out_trade_no\":\""+ s_on +"\","
                + "    \"product_code\":\"FAST_INSTANT_TRADE_PAY\"," + "    \"total_amount\":" + money + ","
                + "    \"subject\":\"VIP充值服务\"," + "    \"body\":\"VIP充值服务\","
                + "    \"passback_params\":\"merchantBizType%3d3C%26merchantBizNo%3d2016010101111\","
                + "    \"extend_params\":{" + "    \"sys_service_provider_id\":\"2088511833207846\"" + "    }" + "  }");// 填充业务参数
        String form = "";
        try {
            form = alipayClient.pageExecute(alipayRequest).getBody(); // 调用SDK生成表单
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }
        httpResponse.setContentType("text/html;charset=" + charset);
        httpResponse.getWriter().write(form);// 直接将完整的表单html输出到页面
        httpResponse.getWriter().flush();
        httpResponse.getWriter().close();
    }
	
	@RequestMapping("success")
    public String success(HttpSession session) {
		String user = (String) SecurityUtils.getSubject().getPrincipal();
		Users u = us.queryLog(user);
		LocalDate now = LocalDate.now();
        LocalDate localDate = now.plusYears(1);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdd = now.atStartOfDay(zoneId);
        ZonedDateTime zdt = localDate.atStartOfDay(zoneId);
        Date date = Date.from(zdd.toInstant());
        Date endDate = Date.from(zdt.toInstant());
		u.setU_vip_date(date);
		u.setU_vip_enddate(endDate);
		u.setU_vip(1);
		us.upd(u);
		Users users = (Users) session.getAttribute(user);
		users.setU_vip_date(date);
		users.setU_vip_enddate(endDate);
		users.setU_vip(1);
		session.setAttribute(user, users);
		return "redirect:/setting_vip.html";
	}
}

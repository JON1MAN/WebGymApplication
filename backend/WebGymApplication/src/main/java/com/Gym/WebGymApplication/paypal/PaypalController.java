package com.Gym.WebGymApplication.paypal;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@Controller
@Slf4j
public class PaypalController {

    @Autowired
    private PaypalService paypalService;

    @CrossOrigin("http://localhost:4200/memberships")
    @PostMapping("/paymentcreate")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody Map<String, Object> paymentDetails) {
        try {
            String method = (String) paymentDetails.get("method");
            Double amount = Double.valueOf(paymentDetails.get("amount").toString());
            String currency = (String) paymentDetails.get("currency");
            String description = (String) paymentDetails.get("description");
            String cancelUrl = "http://localhost:4200/memberships";
            String successUrl = "http://localhost:4200/success";
            Payment payment = paypalService.createPayment(
                    amount,
                    currency,
                    method,
                    "sale",
                    description,
                    cancelUrl,
                    successUrl
            );
            for(Links links: payment.getLinks()){
                if(links.getRel().equals("approval_url")){
                    Map<String, String> response = new HashMap<>();
                    response.put("redirectUrl", links.getHref());
                    return ResponseEntity.ok(response); // Return JSON with the URL
                }
            }
        } catch (PayPalRESTException e){
            log.error("ERROR OCCURRED:: ", e);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/payment/success")
    public ResponseEntity<String> paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("payerId") String payerId
    ){
        try{
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if(payment.getState().equals("approved")){
                return ResponseEntity.ok("Payment was executed successfully");
            }
        } catch (PayPalRESTException e){
            log.error("Error occurred:: ", e);
        }
        return ResponseEntity.ok("Payment wasn't executed successfully");
    }

}

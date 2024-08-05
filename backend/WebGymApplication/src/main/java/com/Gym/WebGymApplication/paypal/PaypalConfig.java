package com.Gym.WebGymApplication.paypal;

import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaypalConfig {

    private String clientId = "Aernp-0bkaJEjE-kQeg9zpRClYggGLUIUXQxjNbh-nX79vdBGUrgLFUwTeYiCtEuA2_uForfddPDtxgc";
    private String clientSecret = "ENJ5b6NC9s5J2pq40hJwRF2NM46HGyurgmDavEDDsRK27UUWmeC3F_IBkyBPW9TNUkgsEFbdHOkVsr_R";
    private String mode = "sandbox";

    @Bean
    public APIContext apiContext(){
        return new APIContext(clientId, clientSecret, mode);
    }
}

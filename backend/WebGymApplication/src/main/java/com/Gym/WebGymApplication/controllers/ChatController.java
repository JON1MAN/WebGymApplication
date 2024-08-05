package com.Gym.WebGymApplication.controllers;

import com.Gym.WebGymApplication.models.Message;
import com.Gym.WebGymApplication.services.MessageService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class ChatController {

    @Autowired
    private MessageService messageService;

    @MessageMapping("/chats/{chatId}")
    @SendTo("/topic/chats/{chatId}")
    public Message sendMessage(
            @Payload Message message,
            @PathVariable("chatId") String chatId
    ){
        return messageService.sendMessageToChat(message);
    }

}

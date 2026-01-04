import {Message} from "@/lib/tickets/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Reply} from "lucide-react";
import {Button} from "@/components/ui/button";

interface MessageThreadProps {
    messages: Message[];
}

export function MessageThread({messages}: MessageThreadProps) {
    return (
        <div className="space-y-6">
            {messages.map((message) => {

                return (
                    <div key={message.id} className="flex gap-3 sm:gap-4">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                            <AvatarImage src={message.avatar} alt={message.senderName}/>
                            <AvatarFallback>
                                {message.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium break-words">{message.senderName}</span>
                                        <span className="text-xs sm:text-sm text-muted-foreground break-all">
                                            &lt;{message.senderEmail}&gt;
                                        </span>
                                    </div>
                                    {message.recipientEmail && (
                                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-all">
                                            To: {message.recipientEmail}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                    <Button variant="ghost" size="icon-sm" className="flex-shrink-0 hover:bg-primary hover:text-white">
                                        <Reply className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="prose prose-sm max-w-none">
                                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}


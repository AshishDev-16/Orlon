"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { 
    Check,
    Code, 
    Image, 
    MessageSquare, 
    Music,
    
    VideoIcon,
    Zap
  } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      
    },
    {
      label: "Image Generation",
      icon: Image,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
     
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
      
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-700",
      bgColor: "bg-green-700/10",
      
    }
  
  ]

export const ProModal = () => {
    const ProModal = useProModal();


    return (
        <Dialog open={ProModal.isOpen} onOpenChange={ProModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-1 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Orlon
                            <Badge variant="premium" className="uppercase text-sm py-1">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                            key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-center"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm ">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                    size="lg"
                    variant="premium"
                    className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


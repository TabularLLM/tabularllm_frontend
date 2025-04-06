'use client'
import React, { useState, useRef, useEffect, useCallback } from "react";

import { SidebarMenuAction } from "@/components/ui/sidebar"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { TbClipboardData } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export interface SidebarItemActionProps {
    id: number;
    insight_name: string;
}

function SidebarItemAction({ id, insight_name } : SidebarItemActionProps ) {
    const [rename, setRename] = useState<boolean>(false)
    const [name, setName] = useState<string>(insight_name)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

    const original_name = insight_name

    const nameRef = useRef(name);

    // Update ref whenever name changes
    useEffect(() => {
        nameRef.current = name;
    }, [name]);

    const handleDelete = (id: number) => {
        setIsOpen(false) 

        toast.promise(axios.delete(`https://tabularllm-api-hyf9apbmf0dxc4ef.canadacentral-01.azurewebsites.net/insight/delete/${id}/`, {
            headers: {
                "Content-Type": "application/json",
            },
            }), {
            loading: 'Deleting...',
            success: (data) => {
                console.log("Insight successfully deleted:", data.data);               
                router.refresh();
                return 'Deleted successfully';
            },
            error: (error) => {
                console.error("Error deleting insight:", error);
                setName(original_name)
                return 'Error in deleting';
            }
        });
    }

    const handleRename = useCallback((id: number) => {
        setRename(false)

        const data = {
            insight_id: id,
            new_name: nameRef.current
        }

        toast.promise(axios.patch("https://tabularllm-api-hyf9apbmf0dxc4ef.canadacentral-01.azurewebsites.net/insight/rename/", data, {
            headers: {
                "Content-Type": "application/json",
            },
            }), {
            loading: 'Renaming...',
            success: (data) => {
                console.log("Insight renamed successfully:", data.data);                
                router.refresh();
                return 'Renamed Successfully';
            },
            error: (error) => {
                console.error("Error renaming insight:", error);
                setName(original_name)
                return 'Error in renaming';
            }
        });

    }, [router])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (rename) {
            e.preventDefault()
        }
    }

    // Focus input when renaming is enabled
    useEffect(() => {
        if (rename) {
            setTimeout(() => {
                const inputElement = inputRef.current;
                if (inputElement) {
                    inputElement.focus(); // Focus the input field
                    inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length); // Move cursor to the end
                }
            }, 200);
        }
    }, [rename]);
    
    // Detect clicks outside of the input field
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setRename(false);
                setName(original_name)
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setRename(false); // Reset renaming mode when Escape is pressed
                setName(original_name)
            }
            else if (event.key === "Enter"){
                handleRename(id)
            }
        };

        if (rename) {
            document.addEventListener("mousedown", handleClickOutside); // Detect mouse clicks
            document.addEventListener("keydown", handleKeyDown); // Detect Escape key press
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [rename, original_name, handleRename, id]);

    return (
        <>  
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your Analysis
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive" onClick={() =>handleDelete(id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Link href={`/analysis_insight/${id}`} onClick={(e) => onLinkClick(e)} className="flex w-full items-center gap-x-4 overflow-hidden rounded-md text-left pl-[7px] pr-2 text-sm outline-none mt-1 hover:text-sidebar-accent-foreground hover:bg-[#D9D9D9]/25">
                <div className="flex items-center justify-center h-[2rem] px-2 rounded-sm text-[#767676] bg-white border border-[#BEBEBE]">
                    <TbClipboardData/>
                </div>
                <input ref={inputRef} className={`font-bold text-[#767676] text-nowrap text-[12px] bg-transparent w-[160px] cursor-pointer focus:outline-none ${rename ? 'border-[1px] border-blue-500' : ''}`} value={name} readOnly={!rename} onChange={handleNameChange}/>  
            </Link> 
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction className="mt-1">
                        <MoreHorizontal />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem asChild>
                        <button className="cursor-pointer flex items-center space-x-1 w-full" onClick={() => (setRename(true))}>
                            <FiEdit />
                            <span>Rename</span>    
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <button className="cursor-pointer flex items-center space-x-1 w-full text-destructive" onClick={() => {setIsOpen(true); document.body.style.pointerEvents = ""}}>
                            <MdDeleteOutline/>
                            <span>Delete Project</span> 
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default SidebarItemAction
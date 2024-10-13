import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenText, Check } from "lucide-react";

export function SurveyDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-black text-white p-2 w-full rounded-lg hover:bg-red h-10">Add Rule</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <div className="bg-white shadow-dark rounded p-4">
                    <DialogHeader>
                        <DialogTitle>Add New Rule</DialogTitle>
                            <DialogDescription>
                                Allow your customers to earn points for completing surveys on products and store.
                            </DialogDescription>
                    </DialogHeader>
                        <div className='flex justify-evenly gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <BookOpenText />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Signing up for the loyalty program</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                                <div className="pl-12 pt-2">
                                    <Check />
                                </div>
                            </div>
                        </div>
                    <DialogFooter>
                        <button className="bg-black text-white p-2 mt-2 w-40 rounded-lg hover:bg-red">
                            Save changes
                        </button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

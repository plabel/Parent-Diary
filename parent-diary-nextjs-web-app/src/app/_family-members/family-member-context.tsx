"use client";
import { createContext, useContext } from "react";
import { FamilyMember } from "../_family-members/types";

export const FamilyMembersContext = createContext<FamilyMember[]>([]);
export const useFamilyMembersContext = () => useContext(FamilyMembersContext);
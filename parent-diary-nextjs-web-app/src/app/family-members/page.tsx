"use client";
import AppHeader from "../_global/app-header";
import FamilyMembers from "../_family-members/family-members";

export default function FamilyMembersPage() {
  return (
    <>
      <AppHeader activeLink="family-members" />
      <main className={`w-100 m-auto`}>
        <div className="container pt-5">
          <FamilyMembers />
        </div>
      </main>
    </>
  );
}

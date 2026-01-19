import { Student } from "@/store/useAppStore";

export function exportToCSV(students: Student[], fileName: string = "students_export.csv") {
    const headers = ["ID", "Name", "Email", "Phone", "Category", "State", "NEET Score", "NEET Rank", "Status"];
    const rows = students.map(s => [
        s.id,
        s.name,
        s.email,
        s.phone,
        s.category,
        s.state,
        s.neet_score,
        s.neet_rank,
        s.status
    ]);

    const csvContent = [
        headers.join(","),
        ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function generateRegistrationPDF(student: Student) {
    // In a real app we'd use jspdf or similar
    // Mocking PDF download with a text file for now to demonstrate the flow
    const content = `
    ADMISSIONS MADE EASY (v0.2.0)
    REGISTRATION ACKNOWLEDGMENT
    -----------------------------------
    STUDENT ID: ${student.id}
    NAME: ${student.name}
    CATEGORY: ${student.category}
    STATE: ${student.state}
    NEET SCORE: ${student.neet_score}
    NEET RANK: ${student.neet_rank}
    
    TIMESTAMP: ${new Date().toLocaleString()}
    -----------------------------------
    This is an auto-generated acknowledgment for your application.
  `;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `registration_${student.id}.pdf`);
    link.click();
}

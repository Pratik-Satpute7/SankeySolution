import java.util.*;

class StudentAttendanceSystem {

    Queue<Integer> entryQueue = new LinkedList<>();
    HashSet<Integer> presentSet = new HashSet<>();
    Stack<Integer> undoStack = new Stack<>();
    List<Integer> recordList = new ArrayList<>();

    void markAttendance(int studentId) {
        if (presentSet.contains(studentId)) {
            System.out.println("Student " + studentId + " is already marked present.");
            return;
        }

        entryQueue.add(studentId);
        presentSet.add(studentId);
        undoStack.push(studentId);
        recordList.add(studentId);

        System.out.println("Attendance marked for student ID : " + studentId);
    }

    void checkPresence(int studentId) {
        if (presentSet.contains(studentId)) {
            System.out.println("Student " + studentId + " is Present.");
        } else {
            System.out.println("Student " + studentId + " is not Present.");
        }
    }

    void undoLastAttendance() {
        if (undoStack.isEmpty()) {
            System.out.println("No attendance to undo.");
            return;
        }

        int lastId = undoStack.pop();
        presentSet.remove(lastId);
        entryQueue.remove(lastId);
        recordList.remove(Integer.valueOf(lastId));

        System.out.println("Last attendance unmarked for student ID:" + lastId);
    }

    void displayAttendance() {
        if (recordList.isEmpty()) {
            System.out.println("No students are marked present");
            return;
        }

        System.out.println("Present student in order :");
        for (int id : recordList) {
            System.out.println("Student ID: " + id);
        }
    }

    public static void main(String[] args) {
        StudentAttendanceSystem system = new StudentAttendanceSystem();
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println(" ========== Student Attendance Management System ==========");
            System.out.println("1. Mark Attendance");
            System.out.println("2. Check if Student is Present");
            System.out.println("3. Undo Last Attendance");
            System.out.println("4. Display All Present Students");
            System.out.println("5. Exit");
            System.out.print("Choose an option: ");

            int choice = sc.nextInt();

            if (choice == 1) {
                System.out.print("Enter Student ID to mark attendance: ");
                int id = sc.nextInt();
                system.markAttendance(id);

            } else if (choice == 2) {
                System.out.print("Enter Student ID to check presence: ");
                int id = sc.nextInt();
                system.checkPresence(id);

            } else if (choice == 3) {
                system.undoLastAttendance();

            } else if (choice == 4) {
                system.displayAttendance();

            } else if (choice == 5) {
                System.out.println("Exiting Attendance System!");
                break;

            } else {
                System.out.println("Invalid option. Please try again.");
            }
        }
    }
}

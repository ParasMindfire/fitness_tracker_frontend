export interface Workout {
    workout_id: number;
    user_id: number;
    exercise_type: string;
    duration: number;
    calories_burned: number;
    workout_date: string;
  }

  export interface WorkoutContextProps {
    workouts: Workout[];
    fetchWorkouts: (token: string) => void;
    formData: Partial<Workout>;
    setFormData: (data: Partial<Workout>) => void;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    selectedWorkout: Workout | null;
    setSelectedWorkout: (workout: Workout | null) => void;
  }
  
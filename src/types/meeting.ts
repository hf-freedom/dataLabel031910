export interface MeetingQueryForm {
  title: string
  status: string
  dateRange: string[]
}

export interface MeetingFormData {
  id?: string
  title: string
  time: string
  location: string
  roomId: string
  attendees: string[]
  equipment: string[]
  description: string
}

export interface MinutesFormData {
  content: string
  todos: string
}

import type React from "react"
import type { SurveyDetails } from "../../types/survey"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SurveyDetailsFormProps {
  details: SurveyDetails
  onChange: (details: SurveyDetails) => void
}

const SurveyDetailsForm: React.FC<SurveyDetailsFormProps> = ({ details, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ ...details, [name]: value })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    onChange({ ...details, [name]: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="survey_title">Survey Title</Label>
        <Input
          id="survey_title"
          name="survey_title"
          value={details.survey_title}
          onChange={handleChange}
          placeholder="Enter survey title"
        />
      </div>
      <div>
        <Label htmlFor="survey_category">Survey Category</Label>
        <Select onValueChange={handleSelectChange("survey_category")} value={details.survey_category}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer_satisfaction">Customer Satisfaction</SelectItem>
            <SelectItem value="product_feedback">Product Feedback</SelectItem>
            <SelectItem value="store_experience">Store Experience</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="store_id">Store ID</Label>
        <Input
          id="store_id"
          name="store_id"
          value={details.store_id}
          onChange={handleChange}
          placeholder="Enter store ID"
        />
      </div>
      <div>
        <Label htmlFor="region">Region</Label>
        <Input id="region" name="region" value={details.region} onChange={handleChange} placeholder="Enter region" />
      </div>
      <div>
        <Label htmlFor="loyalty_tier">Loyalty Tier</Label>
        <Select onValueChange={handleSelectChange("loyalty_tier")} value={details.loyalty_tier}>
          <SelectTrigger>
            <SelectValue placeholder="Select loyalty tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bronze">Bronze</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="platinum">Platinum</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="start_date">Start Date</Label>
        <Input id="start_date" name="start_date" value={details.start_date} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="expiry_date">Expiry Date</Label>
        <Input id="expiry_date" name="expiry_date" value={details.expiry_date} onChange={handleChange} />
      </div>
    </div>
  )
}

export default SurveyDetailsForm


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface JobDetailsFormProps {
  jobRole: string;
  setJobRole: (role: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  experienceLevel: string;
  setExperienceLevel: (level: string) => void;
}

const popularRoles = [
  "Data Scientist",
  "Software Engineer",
  "Product Manager",
  "UX Designer",
  "Marketing Manager",
  "Sales Representative",
  "Business Analyst",
  "DevOps Engineer",
  "Project Manager",
  "Financial Analyst"
];

export const JobDetailsForm = ({
  jobRole,
  setJobRole,
  jobDescription,
  setJobDescription,
  experienceLevel,
  setExperienceLevel
}: JobDetailsFormProps) => {
  const [showPopularRoles, setShowPopularRoles] = useState(true);

  const handleRoleSelect = (role: string) => {
    setJobRole(role);
    setShowPopularRoles(false);
  };

  return (
    <Card className="shadow-medium border-0">
      <CardHeader>
        <CardTitle className="text-xl">Job Details</CardTitle>
        <p className="text-muted-foreground">
          Provide details about the position you're targeting for personalized feedback
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="job-role">Target Job Role *</Label>
          <Input
            id="job-role"
            placeholder="e.g., Senior Data Scientist"
            value={jobRole}
            onChange={(e) => {
              setJobRole(e.target.value);
              setShowPopularRoles(e.target.value === "");
            }}
            className="text-base"
          />
          
          {showPopularRoles && (
            <div className="mt-3">
              <p className="text-sm text-muted-foreground mb-2">Popular roles:</p>
              <div className="flex flex-wrap gap-2">
                {popularRoles.map((role) => (
                  <Badge
                    key={role}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleRoleSelect(role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience-level">Experience Level</Label>
          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
              <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
              <SelectItem value="executive">Executive Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job-description">Job Description (Optional)</Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here for more tailored feedback..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Including a job description will help provide more specific recommendations
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
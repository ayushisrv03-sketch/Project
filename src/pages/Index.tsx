import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { JobDetailsForm } from "@/components/JobDetailsForm";
import { FeedbackDisplay } from "@/components/FeedbackDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock feedback data for demonstration
const mockFeedback = {
  overallScore: 78,
  sections: [
    {
      title: "Professional Summary",
      score: 85,
      feedback: [
        "Strong opening statement that clearly states your role and experience",
        "Good use of industry-specific keywords"
      ],
      suggestions: [
        "Consider adding specific metrics or achievements in the summary",
        "Include your years of experience more prominently"
      ]
    },
    {
      title: "Work Experience",
      score: 82,
      feedback: [
        "Good use of action verbs to start bullet points",
        "Relevant experience for the target role"
      ],
      suggestions: [
        "Add more quantifiable achievements (numbers, percentages, results)",
        "Include keywords from the job description",
        "Consider using the STAR method for describing accomplishments"
      ]
    },
    {
      title: "Skills",
      score: 70,
      feedback: [
        "Relevant technical skills listed",
        "Good mix of hard and soft skills"
      ],
      suggestions: [
        "Organize skills by category (Technical, Leadership, etc.)",
        "Add proficiency levels for key skills",
        "Include more role-specific tools and technologies"
      ]
    },
    {
      title: "Education",
      score: 75,
      feedback: [
        "Relevant degree for the target role",
        "Clean formatting and clear information"
      ],
      suggestions: [
        "Consider adding relevant coursework if recent graduate",
        "Include GPA if above 3.5 and recent graduate"
      ]
    }
  ],
  strengths: [
    "Clear and professional formatting",
    "Strong technical background evident",
    "Good use of action verbs in experience section",
    "Relevant education and certifications",
    "Appropriate length for experience level"
  ],
  improvements: [
    "Add more quantifiable achievements and metrics",
    "Include more keywords from the target job description",
    "Expand on leadership and project management experience",
    "Consider adding a skills proficiency scale",
    "Include links to portfolio or relevant projects"
  ],
  missingKeywords: [
    "Machine Learning",
    "Python",
    "Data Visualization",
    "Statistical Analysis",
    "SQL",
    "Team Leadership",
    "Agile Methodology"
  ]
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'upload' | 'details' | 'results'>('hero');
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const uploadSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentStep('upload');
    setTimeout(() => {
      uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleResumeUpload = async (content: string, type: 'file' | 'text') => {
    setResumeContent(content);
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('details');
      toast({
        title: "Resume uploaded successfully!",
        description: "Please provide job details for personalized feedback.",
      });
    }, 2000);
  };

  const handleAnalyzeResume = async () => {
    if (!jobRole.trim()) {
      toast({
        title: "Job role required",
        description: "Please specify the target job role for analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('results');
      toast({
        title: "Analysis complete!",
        description: "Your personalized resume feedback is ready.",
        variant: "default"
      });
    }, 3000);
  };

  const handleReset = () => {
    setCurrentStep('hero');
    setJobRole("");
    setJobDescription("");
    setExperienceLevel("");
    setResumeContent("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {currentStep === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}

      <div className="container mx-auto px-4 py-8" ref={uploadSectionRef}>
        {currentStep === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <UploadSection 
              onResumeUpload={handleResumeUpload}
              isLoading={isLoading}
            />
          </div>
        )}

        {currentStep === 'details' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Almost Ready!</h2>
              <p className="text-muted-foreground">
                Provide job details to get the most accurate feedback
              </p>
            </div>
            
            <JobDetailsForm
              jobRole={jobRole}
              setJobRole={setJobRole}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              experienceLevel={experienceLevel}
              setExperienceLevel={setExperienceLevel}
            />
            
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('upload')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleAnalyzeResume}
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'results' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Your Resume Analysis</h2>
              <p className="text-muted-foreground">
                Targeting: <span className="font-semibold text-foreground">{jobRole}</span>
                {experienceLevel && ` • ${experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} Level`}
              </p>
            </div>
            
            <FeedbackDisplay feedback={mockFeedback} />
            
            <div className="flex gap-4 justify-center pt-8">
              <Button variant="outline" onClick={handleReset}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Analyze Another Resume
              </Button>
              <Button variant="success">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="secondary">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
